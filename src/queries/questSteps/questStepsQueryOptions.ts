import { queryOptions } from '@tanstack/react-query'
import { fetchQuestSteps } from './questSteps'

export const questStepsKey = 'quest-steps'

export const questStepsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [questStepsKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchQuestSteps(),
    enabled,
  })
