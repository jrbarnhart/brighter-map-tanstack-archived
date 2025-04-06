import * as THREE from 'three'
import { Text } from '@react-three/drei'
import type { CombinedRoomData } from './WorldMap'

// Function to convert RoomRenderData to React Three Fiber elements
const generateRoomShapes = (
  combinedRoomData: CombinedRoomData[],
): React.ReactNode[] => {
  // Create an array to hold all room elements
  const allRoomElements: React.ReactNode[] = []

  // Process each room in the array
  combinedRoomData.forEach((roomData) => {
    const { name, originOffset, points, fillColor, borderColor, labelOffset } =
      roomData

    // Apply the origin offset to all points
    const adjustedPoints: [number, number][] = points.map(([x, y]) => [
      x + originOffset[0],
      (y + originOffset[1]) * -1, // y increases downward instead of upward
    ])

    // Calculate default label position (center of the room) if not provided
    const defaultLabelPosition = calculateCentroid(adjustedPoints)
    const labelPosition = labelOffset
      ? [
          originOffset[0] + labelOffset[0],
          (originOffset[1] + labelOffset[1]) * -1,
        ]
      : defaultLabelPosition

    // Add the room elements to our collection
    allRoomElements.push(
      // Create the floor shape
      <mesh key={`${name}-floor`}>
        <shapeGeometry args={[createShapePath(adjustedPoints)]} />
        <meshBasicMaterial color={fillColor} />
      </mesh>,

      // Create the border/outline
      <line key={`${name}-border`}>
        <bufferGeometry attach="geometry">
          <float32BufferAttribute
            attach="attributes-position"
            args={[createLinePoints(adjustedPoints), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={borderColor}
          linewidth={1}
        />
      </line>,

      // Add the room label
      <Text
        key={`${name}-label`}
        position={[labelPosition[0], labelPosition[1], 0.1]}
        color="white"
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>,
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

export default generateRoomShapes
