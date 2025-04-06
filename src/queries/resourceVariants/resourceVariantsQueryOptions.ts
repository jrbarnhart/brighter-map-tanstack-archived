import { queryOptions } from '@tanstack/react-query'
import { fetchResourceVariants } from './resourceVariants'

export const resourceVariantsKey = 'resource-variants'

export const resourceVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [resourceVariantsKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchResourceVariants(),
    enabled,
  })
