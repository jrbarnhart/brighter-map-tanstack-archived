import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

type RoomsResponse =
  paths['/rooms']['get']['responses']['200']['content']['application/json']
type VendorsResponse =
  paths['/npcs/vendors']['get']['responses']['200']['content']['application/json']

export async function fetchBaseMapData() {
  // console.info('Fetching base map data...');
  // Base map will show rooms with base contents
  // including room name, monster name, resource name, shop name, obelisk, portal
  // Vendors need to be gotten too
  try {
    const queries = [
      axiosClient.get<RoomsResponse>('/rooms'),
      axiosClient.get<VendorsResponse>('npcs/vendors'),
    ]
    const baseMapData = await Promise.all(queries)

    return baseMapData
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
