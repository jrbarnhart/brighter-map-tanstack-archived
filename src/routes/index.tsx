import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { baseMapDataQueryOptions } from '@/queries/baseMapData/baseMapDataQueryOptions'

import useLazyQueries from '@/lib/hooks/useLazyQueries'
import WorldMap from '@/components/WorldMap/WorldMap'
import FiltersPanel from '@/components/FiltersPanel/FiltersPanel'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(baseMapDataQueryOptions),
  component: App,
})

function App() {
  // Base map data comes from loader
  const baseMapQuery = useSuspenseQuery(baseMapDataQueryOptions)
  const baseMapData = baseMapQuery.data

  // Side panel state
  const [filtersOpen, setFiltersOpen] = useState(true)

  // Lazy data loading
  const { data: lazyData, handlers: lazyHandlers } = useLazyQueries()

  return (
    <div id="app-container" className="relative h-svh w-svw flex">
      <FiltersPanel open={filtersOpen} setOpen={setFiltersOpen} />
      <WorldMap baseMapData={baseMapData} />
    </div>
  )
}
