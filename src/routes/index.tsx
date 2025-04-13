import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { baseMapDataQueryOptions } from '@/queries/baseMapData/baseMapDataQueryOptions'

import useLazyQueries from '@/lib/hooks/useLazyQueries'
import WorldMap from '@/components/WorldMap/WorldMap'

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
    <div id="app-container" className="h-svh w-svw">
      <WorldMap baseMapData={baseMapData} />
    </div>
  )
}
