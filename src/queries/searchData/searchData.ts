import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchSearchData() {
  // console.info('Fetching search data...');
  try {
    const [
      miscItemsQuery,
      armorVariantsQuery,
      weaponVariantsQuery,
      consumableVariantsQuery,
      monsterVariantsQuery,
      resourceVariantsQuery,
      questsQuery,
    ] = await Promise.all([
      axiosClient.get<
        paths['/items/misc']['get']['responses']['200']['content']['application/json']
      >('/items/misc'),
      axiosClient.get<
        paths['/items/armors/variants']['get']['responses']['200']['content']['application/json']
      >('/items/armors/variants'),
      axiosClient.get<
        paths['/items/weapons/variants']['get']['responses']['200']['content']['application/json']
      >('/items/weapons/variants'),
      axiosClient.get<
        paths['/items/consumables/variants']['get']['responses']['200']['content']['application/json']
      >('/items/consumables/variants'),
      axiosClient.get<
        paths['/monsters/variants']['get']['responses']['200']['content']['application/json']
      >('/monsters/variants'),
      axiosClient.get<
        paths['/items/resources/variants']['get']['responses']['200']['content']['application/json']
      >('/items/resources/variants'),
      axiosClient.get<
        paths['/quests']['get']['responses']['200']['content']['application/json']
      >('/quests'),
    ])

    return {
      miscItems: miscItemsQuery.data,
      armorVariants: armorVariantsQuery.data,
      weaponVariants: weaponVariantsQuery.data,
      consumableVariants: consumableVariantsQuery.data,
      monsterVariants: monsterVariantsQuery.data,
      resourceVariants: resourceVariantsQuery.data,
      quests: questsQuery.data,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error('An unexpected error occurred while fetching search data')
    }
  }
}
