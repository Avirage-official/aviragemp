# Ethos Marketplace - New Features Visual Guide

## Layout Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  DESKTOP LAYOUT (lg and above)                                      │
├─────────────┬───────────────────────────────────────────────────────┤
│             │  Top Bar (Sticky)                                     │
│             ├───────────────────────────────────────────────────────┤
│             │  🔍 Search Bar              🔔 Notifications (3)      │
│  SIDEBAR    ├───────────────────────────────────────────────────────┤
│  (Fixed)    │  Archetype Spotlight Banner                           │
│             │  ┌─────────────────────────────────────────────────┐ │
│  🎛️ Filters  │  │ 🌟 The Wanderer                                │ │
│             │  │ Explorer of horizons... [Rotating Nature Pics] │ │
│  🎲 Surprise │  └─────────────────────────────────────────────────┘ │
│     Me!     ├───────────────────────────────────────────────────────┤
│             │  Interactive Widgets (only in editorial mode)        │
│  💰 Price   │  ┌──────┬──────────┬──────────┐                      │
│   Range     │  │ Mood │ Progress │   Quiz   │                      │
│             │  │Track │  Badges  │  Teaser  │                      │
│  📍 Distance│  └──────┴──────────┴──────────┘                      │
│             ├───────────────────────────────────────────────────────┤
│  📂 Category│  Friends' Picks (editorial mode)                     │
│             │  ┌────────────────────────────────────────────────┐  │
│  🎨 Vibes   │  │ 👥 3 friends going → [Venue Card]              │  │
│             │  └────────────────────────────────────────────────┘  │
│             ├───────────────────────────────────────────────────────┤
│             │  🔥 Trending Section (6 venues in grid)              │
│             ├───────────────────────────────────────────────────────┤
│             │  🌸 Seasonal Section (horizontal carousel)           │
│             ├───────────────────────────────────────────────────────┤
│             │  🔗 Cross-Promotion Links (4 cards)                  │
│             ├───────────────────────────────────────────────────────┤
│             │  Editorial Lanes / Grid View                         │
│             │  ┌──────┬──────┬──────┬──────┬──────┐               │
│             │  │[Card]│[Card]│[Card]│[Card]│[Card]│               │
│             │  └──────┴──────┴──────┴──────┴──────┘               │
└─────────────┴───────────────────────────────────────────────────────┘

MOBILE LAYOUT (below lg)
┌──────────────────────────┐
│  Top Bar                 │
│  🔍 Search  🎛️  🔔      │
├──────────────────────────┤
│  Archetype Spotlight     │
├──────────────────────────┤
│  Widgets (stacked)       │
├──────────────────────────┤
│  Friends' Picks          │
├──────────────────────────┤
│  Trending / Seasonal     │
├──────────────────────────┤
│  Cards (1-2 columns)     │
│  ┌──────┬──────┐         │
│  │[Card]│[Card]│         │
│  └──────┴──────┘         │
└──────────────────────────┘
```

## Venue Card Enhancement

```
BEFORE (Original Card)
┌─────────────────────────┐
│                         │
│     [Image 3:2]         │
│                         │
├─────────────────────────┤
│  Venue Name             │
│  Location               │
│  [Vibe] [Vibe] [$$$]    │
└─────────────────────────┘

AFTER (Enhanced Card)
┌───────────────────────┐
│   💾 📤              │ ← Save/Share (on hover)
│   [Image 4:3]        │ ← Smaller aspect ratio
│                      │
├───────────────────────┤
│ Venue Name           │ ← Smaller text
│ Location             │
├───────────────────────┤
│ 📍 I'm here | 📅 Going│ ← NEW: Check-in buttons
├───────────────────────┤
│ [Vibe] [Vibe] [$$$]  │
└───────────────────────┘
```

## Sidebar Filters (Desktop)

```
┌──────────────────────┐
│  🎛️ Filters          │
│  Reset all filters   │
├──────────────────────┤
│  🎲 Surprise Me!     │ ← NEW: Random venue
│  [Gradient Button]   │
├──────────────────────┤
│  💰 Price Range      │ ← NEW
│  [$ $$ $$$ $$$$]    │
├──────────────────────┤
│  📍 Max Distance     │ ← NEW
│  [====●--------]     │
│  1 km    50km  100km │
├──────────────────────┤
│  📂 Category         │
│  ○ All Spaces        │
│  ○ NomNoms          │
│  ○ Creative         │
│  ...                │
├──────────────────────┤
│  🎨 Vibes            │
│  ☐ Date · Quiet     │
│  ☐ Friends · Lively │
│  ☐ Solo · Treat     │
│  ...                │
└──────────────────────┘
```

## Interactive Widgets

```
MOOD TRACKER
┌──────────────────────┐
│ ❤️ How are you      │
│    feeling?          │
├──────────────────────┤
│ [Expanded View]      │
│ 🔥 Energized         │
│ 😊 Happy             │
│ ☀️ Calm              │
│ 🌙 Peaceful          │
│ 😐 Neutral           │
│ 😔 Low               │
└──────────────────────┘

PROGRESS BADGES
┌──────────────────────┐
│ 🏅 Your Progress     │
├──────────────────────┤
│ ✨ Explorer  75%     │
│ [=========   ]       │
├──────────────────────┤
│ ⭐ Socialite 50%     │
│ [======      ]       │
├──────────────────────┤
│ 🏆 Adventurer 30%    │
│ [===         ]       │
└──────────────────────┘

NOTIFICATIONS BELL
┌──────────────────────┐
│ 🔔 (3)               │
├──────────────────────┤
│ New venue near you   │
│ Friend checked in    │
│ Complete profile     │
└──────────────────────┘

QUIZ TEASER
┌──────────────────────┐
│ ❓ Discover Your     │
│    Archetype         │
│                      │
│ Take the 5-min quiz  │
│ Unlock personalized  │
│ recommendations  →   │
└──────────────────────┘
```

## Check-In Feature Flow

```
USER INTERACTION
┌─────────────────────────────────────────────┐
│  1. User clicks "I'm here" or "I'm going"   │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  2. POST /api/venue-checkin                 │
│     {                                        │
│       venueId: "xyz",                        │
│       status: "here"  // or "going"          │
│     }                                        │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  3. Database Updates                        │
│     - Create/Update VenueCheckin record     │
│     - Set expiresAt (4hrs or 24hrs)         │
│     - Update User.currentVenue (if "here")  │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  4. Friends See Update                      │
│     - Anonymized in Friends' Picks          │
│     - "3 friends going to Café Harmony"     │
│     - Shows archetypes: "Wanderer, Sage"    │
└─────────────────────────────────────────────┘
```

## Features Summary

### ✅ Sidebar Filters (Always Visible on Desktop)
- Price range ($-$$$$)
- Distance slider (1-100km)
- Surprise Me button
- Category filters
- Vibe filters

### ✅ Smaller Cards
- 4:3 aspect ratio (down from 3:2)
- Compact padding and text
- 5-column grid on 2xl screens

### ✅ Check-In Functionality
- "I am here" button (blue, 4hr expiry)
- "I am going" button (purple, 24hr expiry)
- Auto-expiring check-ins
- Location sharing

### ✅ Friends' Picks
- Anonymized friend activity
- Shows count and archetypes
- Badge indicators

### ✅ Interactive Widgets
- Mood tracker (6 moods)
- Progress badges (3 types)
- Notifications bell
- Quiz teaser

### ✅ UX Polish
- Fun loading states
- Trending section (top 6)
- Seasonal section (auto-detect)
- Cross-promotion links (4 areas)

### ✅ Archetype Spotlight
- User's primary archetype
- Rotating nature images (5 pics)
- Gradient overlays
- Animated transitions
```
