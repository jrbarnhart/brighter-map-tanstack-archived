// This hook takes all rooms geometry data and returns the room shapes and the label shapes

import { useMemo } from 'react'
import { generateLabels, generateRoomShapes } from '../generateShapes'
import type { CombinedRoomData } from '@/lib/hooks/useCombinedData'

type UseRoomShapeProps = {
  combinedRoomData: CombinedRoomData[]
}

export default function useShapes({ ...props }: UseRoomShapeProps) {
  const { combinedRoomData } = props

  // Create the room shapes using combined data
  const roomShapes = useMemo(() => {
    return generateRoomShapes(combinedRoomData)
  }, [])

  // Create the room labels using combined data
  const labelShapes = useMemo(() => {
    return generateLabels(combinedRoomData)
  }, [])

  return { roomShapes, labelShapes }
}
