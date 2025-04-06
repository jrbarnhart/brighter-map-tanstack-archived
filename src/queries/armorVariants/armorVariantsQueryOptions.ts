import { queryOptions } from '@tanstack/react-query'
import { fetchArmorVariants } from './armorVariants'
import queryConfig from '../queryConfig'

export const armorVariantsKey = 'armor-variants'

export const armorVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [armorVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchArmorVariants(),
    enabled,
  })
