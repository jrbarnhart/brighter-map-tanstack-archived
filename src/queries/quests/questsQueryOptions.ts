import { queryOptions } from '@tanstack/react-query'
import { fetchQuests } from './quests'
import queryConfig from '../queryConfig'

export const questsKey = 'quests'

export const questsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [questsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchQuests(),
    enabled,
  })
