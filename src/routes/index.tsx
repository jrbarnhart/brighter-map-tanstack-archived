import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { baseMapDataQueryOptions } from '@/queries/baseMapData/baseMapDataQueryOptions'

import useLazyQueries from '@/lib/hooks/useLazyQueries'
import WorldMap from '@/components/WorldMap/WorldMap'
import FiltersPanel from '@/components/FiltersPanel/FiltersPanel'
import { useState } from 'react'
import MapSearchBar from '@/components/MapControls/MapControls'
import InfoPanel from '@/components/InfoPanel/InfoPanel'

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
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)

  // Lazy data loading
  const { data: lazyData, handlers: lazyHandlers } = useLazyQueries()

  return (
    <div id="app-container" className="relative h-svh w-svw flex">
      <FiltersPanel open={filtersOpen} setOpen={setFiltersOpen} />
      <div className="w-full absolute top-0 right-0 z-10 p-8">
        <MapSearchBar
          setFiltersOpen={setFiltersOpen}
          setInfoOpen={setInfoOpen}
        />
      </div>
      <WorldMap baseMapData={baseMapData} />
      <InfoPanel open={infoOpen} setOpen={setInfoOpen} />
    </div>
  )
}
