// The title has a bg and the info lines have a different bg
// THe info lines need to have variations based on the type of info

import { Text } from '@react-three/drei'
import { useMemo } from 'react'
import type { CombinedRoomData } from '@/lib/hooks/useCombinedData'

type InfoLinesProps = {
  roomData: CombinedRoomData
}

export default function InfoLines({ roomData }: InfoLinesProps) {
  // Room data properties
  const { name, id, monsters, resources, portal, obelisk, rift } = roomData

  // Construct label info lines
  const infoLines = useMemo(() => {
    const infoLines: Array<string> = []

    if (monsters.length) infoLines.push(...monsters.map((m) => `🧟 ${m.name}`))
    if (resources.length)
      infoLines.push(...resources.map((r) => `🪵 ${r.name}`))
    if (portal) infoLines.push('🌐 Portal')
    if (obelisk) infoLines.push('🗿 Obelisk')
    if (rift) infoLines.push('🌀 Storage')
    return infoLines
  }, [roomData])

  // Estimate background size
  const longestLineLength = useMemo(() => {
    if (infoLines.length === 0) return 0

    return infoLines.reduce((a, b) => {
      return a.length > b.length ? a : b
    }).length
  }, [infoLines])

  const bgWidth = useMemo(
    () => 1 + longestLineLength * 0.3,
    [longestLineLength],
  )
  const bgHeight = useMemo(
    () => 1.25 + infoLines.length * 0.6,
    [longestLineLength],
  )

  // Return the info lines
  return (
    <>
      {/* Background */}
      <mesh position={[0, -bgHeight / 2 + 0.25, -0.01]}>
        <planeGeometry args={[bgWidth, bgHeight]} />
        <meshBasicMaterial color="black" transparent opacity={0.6} />
      </mesh>
      {/* Info lines */}
      {infoLines.map((line, index) => (
        <Text
          key={`${name}-${id}-info#-${index}`}
          position={[-bgWidth / 2 + 0.2, -(index + 1) * 0.6, 0.01]}
          fontSize={0.5}
          color="white"
          anchorX="left"
          anchorY="top"
        >
          {line}
        </Text>
      ))}
    </>
  )
}
