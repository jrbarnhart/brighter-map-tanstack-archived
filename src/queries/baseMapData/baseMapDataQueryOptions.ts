import { queryOptions } from '@tanstack/react-query'
import { fetchBaseMapData } from './baseMapData'

export const baseMapDataKey = 'base-map-data'

export default function baseMapDataQueryOptions() {
  return queryOptions({
    queryKey: [baseMapDataKey],
    queryFn: () => fetchBaseMapData(),
  })
}
