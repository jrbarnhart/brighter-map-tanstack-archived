import { queryOptions } from '@tanstack/react-query'
import { fetchResourceVariants } from './resourceVariants'
import queryConfig from '../queryConfig'

export const resourceVariantsKey = 'resource-variants'

export const resourceVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [resourceVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchResourceVariants(),
    enabled,
  })
