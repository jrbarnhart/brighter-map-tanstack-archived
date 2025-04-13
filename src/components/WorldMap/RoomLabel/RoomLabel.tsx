import { useMemo } from 'react'
import { calculateCentroid } from '../geometryHelpers'
import InfoLines from './InfoLines'
import RoomTitle from './RoomTitle'
import type { CombinedRoomData } from '@/lib/hooks/useCombinedData'

type RoomLabelProps = {
  roomData: CombinedRoomData
}

export default function RoomLabel({ roomData }: RoomLabelProps) {
  const { name, id, originOffset, points, labelOffset } = roomData

  // Calculate lable position
  const adjustedPoints: Array<[number, number]> = useMemo(() => {
    return points.map(([x, y]) => [
      x + originOffset[0],
      (y + originOffset[1]) * -1, // Y axis increases in downward direction
    ])
  }, [points, originOffset])

  const defaultLabelPosition = useMemo(
    () => calculateCentroid(adjustedPoints),
    [adjustedPoints],
  )

  const labelPosition: [number, number] = useMemo(
    () =>
      labelOffset
        ? [
            originOffset[0] + labelOffset[0],
            (originOffset[1] + labelOffset[1]) * -1, // Y axis increases in downward direction
          ]
        : defaultLabelPosition,
    [labelOffset, defaultLabelPosition],
  )

  const labelX = labelPosition[0]
  const labelY = labelPosition[1]
  const labelZ = 0.2

  return (
    <>
      <group
        key={`${name}-${id}-label-group`}
        position={[labelX, labelY, labelZ]}
      >
        <RoomTitle name={name} />
        <InfoLines roomData={roomData} />
      </group>
    </>
  )
}
