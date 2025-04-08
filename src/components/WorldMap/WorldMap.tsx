import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { BaseMapData } from '@/queries/baseMapData/baseMapData'
import useShapes from './hooks/useShapes'
import useCombinedData from '@/lib/hooks/useCombinedData'

type WorldMapProps = {
  baseMapData: BaseMapData
}

function Controls() {
  const { invalidate } = useThree()
  return <OrbitControls enableRotate={false} onChange={() => invalidate()} />
}

export default function WorldMap({ ...props }: WorldMapProps) {
  const { baseMapData } = props

  const combinedRoomData = useCombinedData({ baseMapData })

  const { roomShapes, labelShapes } = useShapes({ combinedRoomData })

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 50 }}
        className="bg-stone-800"
        frameloop="demand"
      >
        <Controls />
        {roomShapes}
        {labelShapes}
      </Canvas>
    </div>
  )
}
