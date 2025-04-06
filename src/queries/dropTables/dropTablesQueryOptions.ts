import { queryOptions } from '@tanstack/react-query'
import { fetchDropTables } from './dropTables'
import queryConfig from '../queryConfig'

export const dropTablesKey = 'drop-tables'

export const dropTablesQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [dropTablesKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchDropTables(),
    enabled,
  })
