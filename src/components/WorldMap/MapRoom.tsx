import * as THREE from 'three'

type MapRoomProps = {
  points: [number, number][]
}

export default function MapRoom({ ...props }: MapRoomProps) {
  const { points } = props

  const shape = new THREE.Shape()

  for (const point of points) {
    shape.moveTo(point[0], point[1])
  }

  return (
    <mesh>
      <shapeGeometry>
        <shape moveTo={points} />
      </shapeGeometry>
      <meshBasicMaterial color={'green'} />
    </mesh>
  )
}
