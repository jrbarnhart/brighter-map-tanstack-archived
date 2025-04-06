import { queryOptions } from '@tanstack/react-query'
import { fetchWeaponVariants } from './weaponVariants'
import queryConfig from '../queryConfig'

export const weaponVariantsKey = 'weapon-variants'

export const weaponVariantsQueryOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: [weaponVariantsKey],
    staleTime: queryConfig.staleTime,
    queryFn: () => fetchWeaponVariants(),
    enabled,
  })
