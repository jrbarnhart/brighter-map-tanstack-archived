import { queryOptions } from '@tanstack/react-query'
import { fetchMonsterVariants } from './monsterVariants'

export const monsterVariantsKey = 'monster-variants'

export const monsterVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [monsterVariantsKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchMonsterVariants(),
    enabled,
  })
