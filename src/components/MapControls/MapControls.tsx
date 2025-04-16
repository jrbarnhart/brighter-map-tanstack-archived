import { Book, ListFilterPlus } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import type { SetStateAction } from 'react'

type MapSearchBar = {
  setFiltersOpen: React.Dispatch<SetStateAction<boolean>>
  setInfoOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function MapControls({
  setFiltersOpen,
  setInfoOpen,
}: MapSearchBar) {
  return (
    <div
      id="map-search-container"
      className="w-full flex items-center justify-between gap-4"
    >
      <Button
        onClick={() => {
          setFiltersOpen(true)
        }}
      >
        <ListFilterPlus />
      </Button>
      <Input type="search" placeholder="Search..." className="md:max-w-80" />
      <Button
        onClick={() => {
          setInfoOpen(true)
        }}
      >
        <Book />
      </Button>
    </div>
  )
}
