import { armorVariantsQueryOptions } from '@/queries/armorVariants/armorVariantsQueryOptions'
import { consumableVariantsQueryOptions } from '@/queries/consumableVariants/consumableVariantsQueryOptions'
import { dropTablesQueryOptions } from '@/queries/dropTables/dropTablesQueryOptions'
import { miscItemsQueryOptions } from '@/queries/miscItems/miscItemsQueryOptions'
import { monsterVariantsQueryOptions } from '@/queries/monsterVariants/monsterVariantsQueryOptions'
import { questsQueryOptions } from '@/queries/quests/questsQueryOptions'
import { questStepsQueryOptions } from '@/queries/questSteps/questStepsQueryOptions'
import { resourceVariantsQueryOptions } from '@/queries/resourceVariants/resourceVariantsQueryOptions'
import { weaponVariantsQueryOptions } from '@/queries/weaponVariants/weaponVariantsQueryOptions'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function useLazyQueries() {
  const [enableMiscItems, setEnableMiscItems] = useState(false)
  const { data: miscItems } = useQuery(miscItemsQueryOptions(enableMiscItems))

  const [enableArmorVariants, setEnableArmorVariants] = useState(false)
  const { data: armorVariants } = useQuery(
    armorVariantsQueryOptions(enableArmorVariants),
  )

  const [enableWeaponVariants, setEnableWeaponVariants] = useState(false)
  const { data: weaponVariants } = useQuery(
    weaponVariantsQueryOptions(enableWeaponVariants),
  )

  const [enableConsumableVariants, setEnableConsumableVariants] =
    useState(false)
  const { data: consumableVariants } = useQuery(
    consumableVariantsQueryOptions(enableConsumableVariants),
  )

  const [enableMonsterVariants, setEnableMonsterVariants] = useState(false)
  const { data: monsterVariants } = useQuery(
    monsterVariantsQueryOptions(enableMonsterVariants),
  )

  const [enableResourceVariants, setEnableResourceVariants] = useState(false)
  const { data: resourceVariants } = useQuery(
    resourceVariantsQueryOptions(enableResourceVariants),
  )

  const [enableDropTables, setEnableDropTables] = useState(false)
  const { data: dropTables } = useQuery(
    dropTablesQueryOptions(enableDropTables),
  )

  const [enableQuests, setEnableQuests] = useState(false)
  const { data: quests } = useQuery(questsQueryOptions(enableQuests))

  const [enableQuestSteps, setEnableQuestSteps] = useState(false)
  const { data: questSteps } = useQuery(
    questStepsQueryOptions(enableQuestSteps),
  )

  const enableSearchData = () => {
    setEnableMiscItems(true)
    setEnableArmorVariants(true)
    setEnableWeaponVariants(true)
    setEnableConsumableVariants(true)
    setEnableMonsterVariants(true)
    setEnableResourceVariants(true)
    setEnableQuests(true)
  }

  const enableDropTablesData = () => {
    setEnableDropTables(true)
  }

  const enableQuestStepsData = () => {
    setEnableQuestSteps(true)
  }

  const data = {
    miscItems,
    armorVariants,
    weaponVariants,
    consumableVariants,
    monsterVariants,
    resourceVariants,
    quests,
    questSteps,
    dropTables,
  }

  const handlers = {
    enableSearchData,
    enableDropTablesData,
    enableQuestStepsData,
  }

  return { data, handlers }
}
