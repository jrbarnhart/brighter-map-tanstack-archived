import { createFileRoute } from '@tanstack/react-router'
import { baseMapDataQueryOptions } from '@/queries/baseMapData/baseMapDataQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(baseMapDataQueryOptions),
  component: App,
})

function App() {
  // Base map data comes from loader
  const baseMapQuery = useSuspenseQuery(baseMapDataQueryOptions)
  const baseMapData = baseMapQuery.data

  // Search data is fetched only when search bar first focused

  // Drop table data is fetched only when a monster variant link is clicked

  // Quest steps data is fetched only when a quest link is clicked

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
        />
      </label>
    </div>
  )
}
