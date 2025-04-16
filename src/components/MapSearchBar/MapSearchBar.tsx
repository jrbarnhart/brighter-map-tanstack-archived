import { ListFilterPlus } from 'lucide-react'
import { Input } from '../ui/input'

export default function MapSearchBar() {
  return (
    <div
      id="map-search-container"
      className="w-full flex items-center justify-center gap-4"
    >
      <Input type="search" placeholder="Search..." className="" />
      <ListFilterPlus />
    </div>
  )
}
