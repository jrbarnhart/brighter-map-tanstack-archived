import { queryOptions } from '@tanstack/react-query'
import { fetchBaseMapData } from './baseMapData'

export const baseMapDataKey = 'base-map-data'

export const baseMapDataQueryOptions = queryOptions({
  queryKey: [baseMapDataKey],
  queryFn: () => fetchBaseMapData(),
})
