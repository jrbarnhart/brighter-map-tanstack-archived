// This hook takes all rooms geometry data and returns the room shapes and the label shapes

import { useMemo } from 'react'
import type { CombinedRoomData } from '../WorldMap'
import generateRoomShapes from '../generateRoomShapes'

type UseRoomShapeProps = {
  combinedRoomData: CombinedRoomData[]
}

export default function useShapes({ ...props }: UseRoomShapeProps) {
  const { combinedRoomData } = props

  // Create the room shapes using combined data
  const roomShapes = useMemo(() => {
    return generateRoomShapes(combinedRoomData)
  }, [])

  return { roomShapes }
}
