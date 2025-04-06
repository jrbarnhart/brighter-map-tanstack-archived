import { queryOptions } from '@tanstack/react-query'
import { fetchQuestSteps } from './questSteps'
import queryConfig from '../queryConfig'

export const questStepsKey = 'quest-steps'

export const questStepsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [questStepsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchQuestSteps(),
    enabled,
  })
