// scripts/sync-airtable-to-supabase.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || ''
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || ''
const AIRTABLE_VENUES_TABLE = 'Venues'
const AIRTABLE_SCORES_TABLE = 'Archetype Scores'
const AIRTABLE_VIBES_TABLE = 'Vibes'
const AIRTABLE_API = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

interface AirtableVenue {
  id: string
  fields: {
    'Venue Name': string
    'Status': 'Active' | 'Draft' | 'Archived'
    'Subcategory': 'NomNoms' | 'Creative Vibe'
    'Country': string
    'City': string
    'Neighborhood'?: string
    'Address'?: string
    'Latitude'?: number
    'Longitude'?: number
    'Google Maps URL'?: string
    'Description'?: string
    'Image URL'?: string
    'Website'?: string
    'Phone'?: string
    'Hours'?: string
    'Price Range'?: string
  }
}

interface ArchetypeScore {
  venueId: string
  scores: { [key: string]: number }
}

interface VenueVibe {
  venueId: string
  vibes: string[]
}

// Fetch with pagination support
async function fetchAllRecords(tableName: string): Promise<any[]> {
  let allRecords: any[] = []
  let offset: string | undefined = undefined
  
  do {
    const url = offset 
      ? `${AIRTABLE_API}/${tableName}?offset=${offset}`
      : `${AIRTABLE_API}/${tableName}`
      
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    allRecords = allRecords.concat(data.records || [])
    offset = data.offset
  } while (offset)
  
  return allRecords
}

async function fetchAirtableVenues(): Promise<AirtableVenue[]> {
  console.log('📥 Fetching venues from Airtable...')
  
  const allRecords = await fetchAllRecords(AIRTABLE_VENUES_TABLE)
  const activeVenues = allRecords.filter(r => r.fields['Status'] === 'Active')
  
  console.log(`✅ Found ${activeVenues.length} active venues`)
  return activeVenues
}

async function fetchArchetypeScores(venueRecordId: string): Promise<ArchetypeScore> {
  // Fetch ALL scores and filter client-side (most reliable approach)
  const allScores = await fetchAllRecords(AIRTABLE_SCORES_TABLE)
  
  // Find score record where Venue field (array) contains our venue ID
  const scoreRecord = allScores.find(record => {
    const venueLinks = record.fields['Venue']
    return Array.isArray(venueLinks) && venueLinks.includes(venueRecordId)
  })
  
  const scores: { [key: string]: number } = {}
  
  if (!scoreRecord) {
    console.warn(`⚠️  No archetype scores found for venue ${venueRecordId}`)
    return { venueId: venueRecordId, scores: {} }
  }
  
  // Extract all numeric fields (these are the archetype scores)
  const fields = scoreRecord.fields
  Object.keys(fields).forEach(key => {
    if (key !== 'Venue' && key !== 'Score ID' && typeof fields[key] === 'number') {
      scores[key.toLowerCase()] = fields[key]
    }
  })
  
  console.log(`  ✓ Found ${Object.keys(scores).length} archetype scores`)
  return { venueId: venueRecordId, scores }
}

async function fetchVenueVibes(venueRecordId: string): Promise<VenueVibe> {
  // Fetch ALL vibes and filter client-side
  const allVibes = await fetchAllRecords(AIRTABLE_VIBES_TABLE)
  
  // Find all vibe records linked to this venue
  const vibeRecords = allVibes.filter(record => {
    const venueLinks = record.fields['Venue']
    return Array.isArray(venueLinks) && venueLinks.includes(venueRecordId)
  })
  
  const vibes = vibeRecords
    .map(r => r.fields['Vibe Tag'])
    .filter(Boolean)
  
  if (vibes.length === 0) {
    console.warn(`⚠️  No vibes found for venue ${venueRecordId}`)
  } else {
    console.log(`  ✓ Found ${vibes.length} vibe(s)`)
  }
  
  return { venueId: venueRecordId, vibes }
}

async function syncVenues() {
  console.log('🚀 Starting Airtable → Supabase sync...\n')
  
  try {
    const airtableVenues = await fetchAirtableVenues()
    
    let newCount = 0
    let updateCount = 0
    let errorCount = 0
    
    for (const airtableVenue of airtableVenues) {
      try {
        const fields = airtableVenue.fields
        const airtableId = airtableVenue.id
        
        console.log(`\n📍 Processing: ${fields['Venue Name']}`)
        
        // Fetch related data
        const archetypeData = await fetchArchetypeScores(airtableId)
        const vibeData = await fetchVenueVibes(airtableId)
        
        // Check if venue exists
        const existingVenue = await prisma.venue.findUnique({
          where: { airtableId }
        })
        
        // Prepare venue data
        const venueData = {
          name: fields['Venue Name'],
          countryCode: fields['Country'],
          city: fields['City'],
          neighborhood: fields['Neighborhood'] || null,
          address: fields['Address'] || null,
          latitude: fields['Latitude'] || null,
          longitude: fields['Longitude'] || null,
          googleMapsUrl: fields['Google Maps URL'] || null,
          category: 'spaces',
          subcategory: fields['Subcategory'].toLowerCase().replace(' ', ''),
          description: fields['Description'] || null,
          imageUrl: fields['Image URL'] || null,
          website: fields['Website'] || null,
          phone: fields['Phone'] || null,
          hours: fields['Hours'] ? JSON.parse(fields['Hours']) : null,
          priceRange: fields['Price Range'] || null,
          compatibilityScores: archetypeData.scores,
          airtableId,
          isActive: fields['Status'] === 'Active'
        }
        
        if (existingVenue) {
          // UPDATE
          await prisma.venue.update({
            where: { id: existingVenue.id },
            data: venueData
          })
          
          // Recreate vibes
          await prisma.venueVibe.deleteMany({
            where: { venueId: existingVenue.id }
          })
          
          if (vibeData.vibes.length > 0) {
            await prisma.venueVibe.createMany({
              data: vibeData.vibes.map(vibe => ({
                venueId: existingVenue.id,
                vibe
              }))
            })
          }
          
          updateCount++
          console.log(`✏️  Updated: ${fields['Venue Name']}`)
        } else {
          // CREATE
          const newVenue = await prisma.venue.create({
            data: venueData
          })
          
          if (vibeData.vibes.length > 0) {
            await prisma.venueVibe.createMany({
              data: vibeData.vibes.map(vibe => ({
                venueId: newVenue.id,
                vibe
              }))
            })
          }
          
          newCount++
          console.log(`✅ Created: ${fields['Venue Name']}`)
        }
        
      } catch (error) {
        errorCount++
        console.error(`❌ Error syncing ${airtableVenue.fields['Venue Name']}:`, error)
      }
    }
    
    // Archive venues not in Airtable
    const airtableIds = airtableVenues.map(v => v.id)
    const deletedVenues = await prisma.venue.updateMany({
      where: {
        airtableId: { notIn: airtableIds }
      },
      data: { isActive: false }
    })
    
    // Summary
    console.log('\n' + '='.repeat(50))
    console.log('📊 SYNC COMPLETE')
    console.log('='.repeat(50))
    console.log(`✅ New venues: ${newCount}`)
    console.log(`✏️  Updated: ${updateCount}`)
    console.log(`🗑️  Archived: ${deletedVenues.count}`)
    console.log(`❌ Errors: ${errorCount}`)
    console.log('='.repeat(50) + '\n')
    
  } catch (error) {
    console.error('❌ Sync failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

syncVenues()
  .then(() => {
    console.log('✅ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })