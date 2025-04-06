import { createFileRoute } from '@tanstack/react-router'
import { baseMapDataQueryOptions } from '@/queries/baseMapData/baseMapDataQueryOptions'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { miscItemsQueryOptions } from '@/queries/miscItems/miscItemsQueryOptions'
import { armorVariantsQueryOptions } from '@/queries/armorVariants/armorVariantsQueryOptions'
import { weaponVariantsQueryOptions } from '@/queries/weaponVariants/weaponVariantsQueryOptions'
import { consumableVariantsQueryOptions } from '@/queries/consumableVariants/consumableVariantsQueryOptions'
import { monsterVariantsQueryOptions } from '@/queries/monsterVariants/monsterVariantsQueryOptions'
import { resourceVariantsQueryOptions } from '@/queries/resourceVariants/resourceVariantsQueryOptions'
import { dropTablesQueryOptions } from '@/queries/dropTables/dropTablesQueryOptions'
import { questsQueryOptions } from '@/queries/quests/questsQueryOptions'
import { questStepsQueryOptions } from '@/queries/questSteps/questStepsQueryOptions'

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(baseMapDataQueryOptions),
  component: App,
})

function App() {
  // Base map data comes from loader
  const baseMapQuery = useSuspenseQuery(baseMapDataQueryOptions)
  const baseMapData = baseMapQuery.data

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

  return (
    <div className="text-center">
      <p>Total rooms: {baseMapData.rooms.length}</p>
      <p>Total vendors: {baseMapData.vendors.length}</p>
      <label htmlFor="search">
        Search:
        <input
          type="search"
          placeholder="Search..."
          className="border border-gray-400"
          onFocus={() => {
            setEnableMiscItems(true)
          }}
        />
      </label>
      <p>Monster Variants: {miscItems?.length}</p>
      <a href="" onMouseOver={() => setEnableMiscItems(true)}>
        Monster Link!
      </a>
    </div>
  )
}
