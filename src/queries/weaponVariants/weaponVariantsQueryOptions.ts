import { queryOptions } from '@tanstack/react-query'
import { fetchWeaponVariants } from './weaponVariants'

export const weaponVariantsKey = 'weapon-variants'

export const weaponVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [weaponVariantsKey],
    staleTime: 1800000, // 30 min since data set is large and relatively unchanging
    queryFn: () => fetchWeaponVariants(),
    enabled,
  })
