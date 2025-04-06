import { queryOptions } from '@tanstack/react-query'
import { fetchSearchData } from './searchData'

export const searchDataKey = 'search-data'

export const searchDataQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [searchDataKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchSearchData(),
    enabled,
  })
