import { createFileRoute } from '@tanstack/react-router'
import { baseMapDataQueryOptions } from '@/queries/baseMapData/baseMapDataQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

import useLazyQueries from '@/lib/hooks/useLazyQueries'

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(baseMapDataQueryOptions),
  component: App,
})

function App() {
  // Base map data comes from loader
  const baseMapQuery = useSuspenseQuery(baseMapDataQueryOptions)
  const baseMapData = baseMapQuery.data

  // Lazy data loading
  const { data: lazyData, handlers: lazyHandlers } = useLazyQueries()

  return (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <h1>Base Data:</h1>
        <p>Total rooms: {baseMapData.rooms.length}</p>
        <p>Total vendors: {baseMapData.vendors.length}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Mock interactive elements:</h1>
        <label htmlFor="search">
          Search:
          <input
            type="search"
            placeholder="Search..."
            className="border border-gray-400"
            onFocus={() => {
              lazyHandlers.enableSearchData()
            }}
          />
        </label>
        <a
          href="#"
          onMouseOver={() => lazyHandlers.enableQuestStepsData()}
          className="bg-green-500 w-min whitespace-nowrap p-2 font-bold rounded-xl"
        >
          Quest Link
        </a>
        <a
          href="#"
          onMouseOver={() => lazyHandlers.enableDropTablesData()}
          className="bg-blue-500 w-min whitespace-nowrap p-2 font-bold rounded-xl"
        >
          Monster Variant Link
        </a>
      </div>
      <div>
        <h1>Lazy Data:</h1>
        <p>
          Armor Variants:{' '}
          {lazyData.armorVariants
            ? lazyData.armorVariants.length
            : 'Not loaded'}
        </p>
        <p>
          Weapon Variants:{' '}
          {lazyData.weaponVariants
            ? lazyData.weaponVariants.length
            : 'Not loaded'}
        </p>
        <p>
          Consumable Variants:{' '}
          {lazyData.consumableVariants
            ? lazyData.consumableVariants.length
            : 'Not loaded'}
        </p>
        <p>
          Misc Items:{' '}
          {lazyData.miscItems ? lazyData.miscItems.length : 'Not loaded'}
        </p>
        <p>
          Monster Variants:{' '}
          {lazyData.monsterVariants
            ? lazyData.monsterVariants.length
            : 'Not loaded'}
        </p>
        <p>
          Resource Variants:{' '}
          {lazyData.resourceVariants
            ? lazyData.resourceVariants.length
            : 'Not loaded'}
        </p>
        <p>Quests: {lazyData.quests ? lazyData.quests.length : 'Not loaded'}</p>
        <p>
          Quest Steps:{' '}
          {lazyData.questSteps ? lazyData.questSteps.length : 'Not loaded'}
        </p>
        <p>
          Drop Tables:{' '}
          {lazyData.dropTables ? lazyData.dropTables.length : 'Not loaded'}
        </p>
      </div>
    </div>
  )
}
