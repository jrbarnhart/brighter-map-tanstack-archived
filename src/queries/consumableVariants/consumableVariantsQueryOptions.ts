import { queryOptions } from '@tanstack/react-query'
import { fetchConsumableVariants } from './consumableVariants'

export const consumableVariantsKey = 'consumable-variants'

export const consumableVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [consumableVariantsKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchConsumableVariants(),
    enabled,
  })
