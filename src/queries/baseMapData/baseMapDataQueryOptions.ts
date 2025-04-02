import { queryOptions } from '@tanstack/react-query'
import { fetchBaseMapData } from './baseMapData'

export default function baseMapDataQueryOptions() {
  return queryOptions({
    queryKey: ['base-map-data'],
    queryFn: () => fetchBaseMapData(),
  })
}
