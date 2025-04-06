import { queryOptions } from '@tanstack/react-query'
import { fetchMiscItems } from './miscItems'

export const miscItemsKey = 'misc-items'

export const miscItemsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [miscItemsKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchMiscItems(),
    enabled,
  })
