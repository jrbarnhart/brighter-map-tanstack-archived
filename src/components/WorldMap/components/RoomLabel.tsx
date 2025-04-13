import type { CombinedRoomData } from '@/lib/hooks/useCombinedData'
import { useMemo } from 'react'
import { calculateCentroid } from '../geometryHelpers'
import { Text } from '@react-three/drei'
import InfoLines from './InfoLines'

type RoomLabelProps = {
  roomData: CombinedRoomData
}

export default function RoomLabel({ roomData }: RoomLabelProps) {
  const {
    name,
    id,
    originOffset,
    points,
    labelOffset,
    monsters,
    resources,
    portal,
    obelisk,
    rift,
  } = roomData

  // Calculate lable position
  const adjustedPoints: [number, number][] = useMemo(() => {
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

  // Construct label info lines
  const infoLines = useMemo(() => {
    const infoLines: string[] = []

    if (monsters?.length) infoLines.push(...monsters.map((m) => `🧟 ${m.name}`))
    if (resources?.length)
      infoLines.push(...resources.map((r) => `🪵 ${r.name}`))
    if (portal) infoLines.push('🌐 Portal')
    if (obelisk) infoLines.push('🗿 Obelisk')
    if (rift) infoLines.push('🌀 Storage')
    return infoLines
  }, [roomData])

  // Estimate background size
  const longestLineLength = useMemo(
    () =>
      [roomData.name, ...infoLines].reduce((a, b) => {
        return a.length > b.length ? a : b
      }).length,
    [roomData],
  )

  const bgWidth = useMemo(
    () => 1 + longestLineLength * 0.3,
    [longestLineLength],
  )
  const bgHeight = useMemo(
    () => 1.25 + infoLines.length * 0.6,
    [longestLineLength],
  )

  return (
    <>
      <group
        key={`${name}-${id}-label-group`}
        position={[labelX, labelY, labelZ]}
      >
        {/* Title Background */}
        {/* Room name */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="top"
          fontWeight="bold"
        >
          {name}
        </Text>
        <InfoLines roomData={roomData} />
      </group>
    </>
  )
}
