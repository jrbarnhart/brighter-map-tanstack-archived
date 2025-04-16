import { X } from 'lucide-react'
import { Button } from '../ui/button'
import type { SetStateAction } from 'react'
import { cn } from '@/lib/utils'

type FiltersPanelProps = {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function FiltersPanel({ open, setOpen }: FiltersPanelProps) {
  return (
    <aside
      className={cn(
        'flex flex-col p-4 w-full shrink-0 transition-transform duration-300 ease-in-out z-10',
        'absolute left-0 top-0 bottom-0 right-0 bg-background border-r', // Mobile
        open ? 'translate-x-0' : '-translate-x-full', // Translate if open
        'md:w-42', // Desktop
      )}
    >
      <Button
        className="self-end w-fit"
        onClick={() => {
          setOpen(false)
        }}
      >
        <X />
      </Button>
      <p>Filter Names</p>
      <p>Filter Monsters</p>
      <p>Filter Resources</p>
    </aside>
  )
}
