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
            lazyHandlers.enableSearchData()
          }}
        />
      </label>
      <a href="" onMouseOver={() => lazyHandlers.enableQuestStepsData()}>
        Quest Link!
      </a>
      <p>Monster Variants: {lazyData.monsterVariants?.length}</p>
    </div>
  )
}
