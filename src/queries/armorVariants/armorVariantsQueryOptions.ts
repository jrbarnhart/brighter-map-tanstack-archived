import { queryOptions } from '@tanstack/react-query'
import { fetchArmorVariants } from './armorVariants'

export const armorVariantsKey = 'armor-variants'

export const armorVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [armorVariantsKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchArmorVariants(),
    enabled,
  })
