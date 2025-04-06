import { queryOptions } from '@tanstack/react-query'
import { fetchQuests } from './quests'

export const questsKey = 'quests'

export const questsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [questsKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchQuests(),
    enabled,
  })
