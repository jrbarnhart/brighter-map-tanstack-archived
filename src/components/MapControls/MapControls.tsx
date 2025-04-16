import { BookOpen, ListFilterPlus, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
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
        aria-label="Open Filters Panel"
        className="cursor-pointer bg-sky-800 hover:bg-sky-600 md:scale-150"
        onClick={() => {
          setFiltersOpen(true)
        }}
      >
        <ListFilterPlus aria-hidden />
      </Button>
      <Label htmlFor="search" aria-label="Search">
        <Search aria-hidden />
        <Input
          id="search"
          type="search"
          placeholder="Search..."
          className="md:max-w-80"
        />
      </Label>
      <Button
        aria-label="Open Info Panel"
        className="cursor-pointer bg-green-800 hover:bg-green-600 md:scale-150"
        onClick={() => {
          setInfoOpen(true)
        }}
      >
        <BookOpen aria-hidden />
      </Button>
    </div>
  )
}
