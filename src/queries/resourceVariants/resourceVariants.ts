import axios from 'axios'
import { axiosClient } from '../axiosClient'
import type { paths } from '@/lib/types/apiTypes'

export async function fetchResourceVariants() {
  // console.info('Fetching resource variants...');
  try {
    const resourceVariantsQuery = await axiosClient.get<
      paths['/items/resources/variants']['get']['responses']['200']['content']['application/json']
    >('/items/resources/variants')

    return resourceVariantsQuery.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(
        'An unexpected error occurred while fetching resource variants.',
      )
    }
  }
}
