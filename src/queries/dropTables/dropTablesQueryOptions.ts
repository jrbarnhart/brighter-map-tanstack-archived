import { queryOptions } from '@tanstack/react-query'
import { fetchDropTableData } from './dropTable'

export const dropTablesKey = 'drop-tables'

export const dropTableQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [dropTablesKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchDropTableData(),
    enabled,
  })
