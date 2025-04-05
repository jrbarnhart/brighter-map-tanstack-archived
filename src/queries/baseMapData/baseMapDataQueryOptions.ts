import { queryOptions } from '@tanstack/react-query'
import { fetchBaseMapData } from './baseMapData'

export const baseMapDataKey = 'base-map-data'

export const baseMapDataQueryOptions = queryOptions({
  queryKey: [baseMapDataKey],
  staleTime: 1800000, // 30 min since data set is large and relatively unchanging
  queryFn: () => fetchBaseMapData(),
})
