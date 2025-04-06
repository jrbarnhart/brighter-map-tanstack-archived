import { queryOptions } from '@tanstack/react-query'
import { fetchConsumableVariants } from './consumableVariants'
import queryConfig from '../queryConfig'

export const consumableVariantsKey = 'consumable-variants'

export const consumableVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [consumableVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchConsumableVariants(),
    enabled,
  })
