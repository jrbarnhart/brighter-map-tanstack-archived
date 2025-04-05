import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchBaseMapData() {
  // console.info('Fetching base map data...');
  try {
    const roomsQuery =
      axiosClient.get<
        paths['/rooms']['get']['responses']['200']['content']['application/json']
      >('/rooms')
    const vendorsQuery =
      axiosClient.get<
        paths['/npcs/vendors']['get']['responses']['200']['content']['application/json']
      >('/npcs/vendors')

    const response = await Promise.all([roomsQuery, vendorsQuery])
    return { rooms: response[0].data, vendors: response[1].data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(
        'An unexpected error occurred while fetching base map data.',
      )
    }
  }
}

// Rooms will not include access to monster/resource variants
// They will include the "base" levels of things like the monster/resource which includes the base name.
// Ex Deathcrow vs Beadey-eyed Deathcrow
// Drop tables are also not included and will need a query

// So I'll need monster variants and resource variants queries
// Same if I want to display quests/steps misc items, consumable/variants, armor/variants, and weapon/variants

// So the search bar when intearcted with should probably fetch:
// quests
// misc items, armor variants, weapon variants, consumable variants
// monster variants
// resource variants

// When a monster variant link is interacted with should fetch:
// drop tables

// When a quest link is interacted with should fetch:
// quest steps
