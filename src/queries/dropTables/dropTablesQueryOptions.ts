import { queryOptions } from '@tanstack/react-query'
import { fetchDropTables } from './dropTables'

export const dropTablesKey = 'drop-tables'

export const dropTablesQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [dropTablesKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchDropTables(),
    enabled,
  })
