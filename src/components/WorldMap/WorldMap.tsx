import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MapRoom from './MapRoom'

export default function WorldMap() {
  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <MapRoom />
      </Canvas>
    </div>
  )
}
