import { createFileRoute } from '@tanstack/react-router'
import { baseMapDataQueryOptions } from '@/queries/baseMapData/baseMapDataQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(baseMapDataQueryOptions),
  component: App,
})

function App() {
  const baseMapQuery = useSuspenseQuery(baseMapDataQueryOptions)
  const baseMapData = baseMapQuery.data

  return (
    <div className="text-center">
      <p>Total rooms: {baseMapData.rooms.length}</p>
      <p>Total vendors: {baseMapData.vendors.length}</p>
    </div>
  )
}
