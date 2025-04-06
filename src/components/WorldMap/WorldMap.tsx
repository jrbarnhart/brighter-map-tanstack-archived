import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import roomRenderData from '@/lib/mapData/roomRenderData'
import { useMemo } from 'react'
import generateRoomShapes from './generateRoomShapes'

export default function WorldMap() {
  const shapes = useMemo(() => {
    return generateRoomShapes(roomRenderData)
  }, [])

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        className="bg-stone-900"
      >
        <ambientLight intensity={0.5} />
        <OrbitControls enableRotate={false} />
        {shapes}
      </Canvas>
    </div>
  )
}
