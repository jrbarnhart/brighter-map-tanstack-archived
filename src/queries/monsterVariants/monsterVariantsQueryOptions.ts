import { queryOptions } from '@tanstack/react-query'
import { fetchMonsterVariants } from './monsterVariants'
import queryConfig from '../queryConfig'

export const monsterVariantsKey = 'monster-variants'

export const monsterVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [monsterVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchMonsterVariants(),
    enabled,
  })
