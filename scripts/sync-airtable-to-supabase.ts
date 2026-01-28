// scripts/sync-airtable-to-supabase.ts
// Phase 2A: Sync venues from Airtable to Supabase

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================
// CONFIGURATION - Update these with your Airtable details
// ============================================================

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || ''
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || ''
const AIRTABLE_VENUES_TABLE = 'Venues'
const AIRTABLE_SCORES_TABLE = 'Archetype Scores'
const AIRTABLE_VIBES_TABLE = 'Vibes'

// Airtable API endpoint
const AIRTABLE_API = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

// ============================================================
// TYPES
// ============================================================

interface AirtableVenue {
  id: string // Airtable record ID
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
  scores: {
    [key: string]: number // archetype name -> score (0-100)
  }
}

interface VenueVibe {
  venueId: string
  vibes: string[]
}

// ============================================================
// FETCH FROM AIRTABLE
// ============================================================

async function fetchAirtableVenues(): Promise<AirtableVenue[]> {
  console.log('📥 Fetching venues from Airtable...')
  
  const response = await fetch(
    `${AIRTABLE_API}/${AIRTABLE_VENUES_TABLE}?filterByFormula={Status}='Active'`,
    {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )
  
  if (!response.ok) {
    throw new Error(`Airtable API error: ${response.statusText}`)
  }
  
  const data = await response.json()
  console.log(`✅ Found ${data.records.length} active venues`)
  return data.records
}

async function fetchArchetypeScores(venueRecordId: string): Promise<ArchetypeScore> {
  // Fetch linked Archetype Scores for this venue
  const response = await fetch(
    `${AIRTABLE_API}/${AIRTABLE_SCORES_TABLE}?filterByFormula=FIND('${venueRecordId}',{Venue})`,
    {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
      }
    }
  )
  
  const data = await response.json()
  const scores: { [key: string]: number } = {}
  
  if (data.records.length > 0) {
    const fields = data.records[0].fields
    // Extract all archetype scores (assuming columns like "Sentinel", "Wanderer", etc.)
    Object.keys(fields).forEach(key => {
      if (key !== 'Venue' && typeof fields[key] === 'number') {
        scores[key.toLowerCase()] = fields[key]
      }
    })
  }
  
  return { venueId: venueRecordId, scores }
}

async function fetchVenueVibes(venueRecordId: string): Promise<VenueVibe> {
  const response = await fetch(
    `${AIRTABLE_API}/${AIRTABLE_VIBES_TABLE}?filterByFormula=FIND('${venueRecordId}',{Venue})`,
    {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
      }
    }
  )
  
  const data = await response.json()
  const vibes = data.records.map((r: any) => r.fields['Vibe Tag']).filter(Boolean)
  
  return { venueId: venueRecordId, vibes }
}

// ============================================================
// SYNC TO SUPABASE
// ============================================================

async function syncVenues() {
  console.log('🚀 Starting Airtable → Supabase sync...\n')
  
  try {
    // Fetch all active venues from Airtable
    const airtableVenues = await fetchAirtableVenues()
    
    let newCount = 0
    let updateCount = 0
    let errorCount = 0
    
    for (const airtableVenue of airtableVenues) {
      try {
        const fields = airtableVenue.fields
        const airtableId = airtableVenue.id
        
        // Fetch related data
        const archetypeData = await fetchArchetypeScores(airtableId)
        const vibeData = await fetchVenueVibes(airtableId)
        
        // Check if venue already exists in Supabase
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
          // UPDATE existing venue
          await prisma.venue.update({
            where: { id: existingVenue.id },
            data: venueData
          })
          
          // Delete existing vibes and recreate (simplest approach)
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
          // CREATE new venue
          const newVenue = await prisma.venue.create({
            data: venueData
          })
          
          // Add vibes
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
    
    // Clean up archived venues (remove from Supabase if not in Airtable active list)
    const airtableIds = airtableVenues.map(v => v.id)
    const deletedVenues = await prisma.venue.updateMany({
      where: {
        airtableId: {
          notIn: airtableIds
        }
      },
      data: {
        isActive: false
      }
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

// ============================================================
// RUN SYNC
// ============================================================

syncVenues()
  .then(() => {
    console.log('✅ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })