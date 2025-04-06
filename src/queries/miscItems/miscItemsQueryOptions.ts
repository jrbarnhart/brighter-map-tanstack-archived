import { queryOptions } from '@tanstack/react-query'
import { fetchMiscItems } from './miscItems'
import queryConfig from '../queryConfig'

export const miscItemsKey = 'misc-items'

export const miscItemsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [miscItemsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchMiscItems(),
    enabled,
  })
