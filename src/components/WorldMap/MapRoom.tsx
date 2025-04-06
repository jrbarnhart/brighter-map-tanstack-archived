import * as THREE from 'three'
import { Line } from '@react-three/drei'

export default function MapRoom() {
  const points = []
  points.push(new THREE.Vector3(-10, 0, 0))
  points.push(new THREE.Vector3(0, 10, 0))
  points.push(new THREE.Vector3(10, 0, 0))

  return <Line points={points} color={'black'} linewidth={3} />
}
