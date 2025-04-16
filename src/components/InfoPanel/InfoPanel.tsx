import { ArrowRightToLine } from 'lucide-react'
import { Button } from '../ui/button'
import type { SetStateAction } from 'react'
import { cn } from '@/lib/utils'

type InfoPanelProps = {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function InfoPanel({ open, setOpen }: InfoPanelProps) {
  return (
    <aside
      className={cn(
        'flex flex-col gap-3 p-6 w-full shrink-0 transition-transform duration-300 ease-in-out z-20',
        'absolute top-0 right-0 bottom-0 bg-background border-r', // Mobile
        open ? 'translate-x-0' : 'translate-x-full', // Translate if open
        'md:w-96', // Desktop
      )}
    >
      <Button
        className="self-end w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-gray-200 hover:bg-gray-300"
        onClick={() => {
          setOpen(false)
        }}
      >
        <ArrowRightToLine />
      </Button>
      <p>Info Stuff</p>
    </aside>
  )
}
