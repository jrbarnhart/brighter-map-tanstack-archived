import type { paths } from '@/lib/types/apiTypes'
import { axiosClient } from '../axiosClient'
import axios from 'axios'

export async function fetchQuestSteps() {
  // console.info('Fetching quest steps...');
  try {
    const questStepsQuery =
      await axiosClient.get<
        paths['/quests/steps']['get']['responses']['200']['content']['application/json']
      >('/quests/steps')

    return questStepsQuery.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.error(error)
      throw new Error(
        'An unexpected error occurred while fetching quest steps.',
      )
    }
  }
}
