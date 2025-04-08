import * as THREE from 'three'
import { Text } from '@react-three/drei'
import type { CombinedRoomData } from '@/lib/hooks/useCombinedData'

export function generateLabels(
  combinedRoomData: CombinedRoomData[],
): React.ReactNode[] {
  const allLabelElements: React.ReactNode[] = []

  for (const roomData of combinedRoomData) {
    const {
      name,
      originOffset,
      points,
      labelOffset,
      monsters,
      resources,
      portal,
      obelisk,
    } = roomData

    const adjustedPoints: [number, number][] = points.map(([x, y]) => [
      x + originOffset[0],
      (y + originOffset[1]) * -1, // Y axis increases in downward direction
    ])

    const defaultLabelPosition = calculateCentroid(adjustedPoints)
    const labelPosition = labelOffset
      ? [
          originOffset[0] + labelOffset[0],
          (originOffset[1] + labelOffset[1]) * -1, // Y axis increases in downward direction
        ]
      : defaultLabelPosition

    const labelX = labelPosition[0]
    const labelY = labelPosition[1]
    const labelZ = 0.1

    // Build info lines with icons
    const infoLines: string[] = []

    if (monsters?.length) infoLines.push(...monsters.map((m) => `🧟 ${m.name}`))
    if (resources?.length)
      infoLines.push(...resources.map((r) => `🪵 ${r.name}`))
    if (portal) infoLines.push('🌀 Portal')
    if (obelisk) infoLines.push('🗿 Obelisk')

    // Estimate background size
    const longestLineLength = [roomData.name, ...infoLines].reduce((a, b) => {
      return a.length > b.length ? a : b
    }).length
    const bgWidth = 1 + longestLineLength * 0.3
    const bgHeight = 1.25 + infoLines.length * 0.6

    allLabelElements.push(
      // Label group
      <group key={`${name}-label-group`} position={[labelX, labelY, labelZ]}>
        {/* Background */}
        <mesh position={[0, -bgHeight / 2 + 0.25, -0.01]}>
          <planeGeometry args={[bgWidth, bgHeight]} />
          <meshBasicMaterial color="black" transparent opacity={0.6} />
        </mesh>

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

        {/* Info lines */}
        {infoLines.map((line, index) => (
          <Text
            key={`${name}-info-${index}`}
            position={[0, -(index + 1) * 0.6, 0.01]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="top"
          >
            {line}
          </Text>
        ))}
      </group>,
    )
  }

  return allLabelElements
}

export function generateRoomShapes(
  combinedRoomData: CombinedRoomData[],
): React.ReactNode[] {
  const allRoomElements: React.ReactNode[] = []

  combinedRoomData.forEach((roomData) => {
    const { name, originOffset, points, fillColor, borderColor } = roomData

    const adjustedPoints: [number, number][] = points.map(([x, y]) => [
      x + originOffset[0],
      (y + originOffset[1]) * -1, // Y axis increases in downward direction
    ])

    allRoomElements.push(
      // Floor
      <mesh key={`${name}-floor`}>
        <shapeGeometry args={[createShapePath(adjustedPoints)]} />
        <meshBasicMaterial color={fillColor} />
      </mesh>,

      // Border
      <line key={`${name}-border`}>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute
            attach="attributes-position"
            args={[createLinePoints(adjustedPoints), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={borderColor} linewidth={1} />
      </line>,
    )
  })

  return allRoomElements
}

// Helper function to create a Three.js Shape from points
const createShapePath = (points: [number, number][]) => {
  const shape = new THREE.Shape()

  if (points.length < 3) return shape

  shape.moveTo(points[0][0], points[0][1])

  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i][0], points[i][1])
  }

  // Close the shape
  shape.lineTo(points[0][0], points[0][1])

  return shape
}

// Helper function to create line points for the border
const createLinePoints = (points: [number, number][]) => {
  const linePoints: number[] = []

  // Add each point as x, y, z coordinates
  points.forEach((point) => {
    linePoints.push(point[0], point[1], 0)
  })

  // Add the first point again to close the shape
  if (points.length > 0) {
    linePoints.push(points[0][0], points[0][1], 0)
  }

  return linePoints
}

// Helper function to calculate the centroid of a polygon
const calculateCentroid = (points: [number, number][]): [number, number] => {
  if (points.length === 0) return [0, 0]

  let sumX = 0
  let sumY = 0

  points.forEach(([x, y]) => {
    sumX += x
    sumY += y
  })

  return [sumX / points.length, sumY / points.length]
}
