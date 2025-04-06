import { queryOptions } from '@tanstack/react-query'
import { fetchBaseMapData } from './baseMapData'
import queryConfig from '../queryConfig'

export const baseMapDataKey = 'base-map-data'

export const baseMapDataQueryOptions = queryOptions({
  queryKey: [baseMapDataKey],
  staleTime: queryConfig.staleTime,
  queryFn: () => fetchBaseMapData(),
})
