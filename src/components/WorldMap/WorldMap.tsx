import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import roomRenderData from '@/lib/mapData/roomRenderData'
import { useMemo } from 'react'
import type { BaseMapData } from '@/queries/baseMapData/baseMapData'
import type { components } from '@/lib/types/apiTypes'
import useShapes from './hooks/useShapes'

type WorldMapProps = {
  baseMapData: BaseMapData
}

export type CombinedRoomData = RoomRenderData[number] &
  components['schemas']['RoomEntity']

function Controls() {
  const { invalidate } = useThree()

  return <OrbitControls enableRotate={false} onChange={() => invalidate()} />
}

export default function WorldMap({ ...props }: WorldMapProps) {
  const { baseMapData } = props

  // Create a lookup map of the base data rooms
  const baseDataMap = new Map<string, components['schemas']['RoomEntity']>()
  for (const room of baseMapData.rooms) {
    baseDataMap.set(room.name, room)
  }

  // Combine base data from api and render data
  const combinedRoomData = useMemo(() => {
    return roomRenderData.map((renderData) => {
      const baseRoomData = baseDataMap.get(renderData.name)
      if (baseRoomData) {
        return {
          ...renderData,
          ...baseRoomData,
        }
      }
      console.error(
        `Base data not found for room: ${renderData.name}. Check this room in roomRenderData.ts for mismatch with api room name.`,
      )
      const emptyBaseData: components['schemas']['RoomEntity'] = {
        banks: [],
        craftingSkills: [],
        id: -100,
        resources: [],
        monsters: [],
        name: 'ERROR',
        npcs: [],
        obelisk: false,
        portal: false,
        questSteps: [],
        region: { id: -100, name: 'ERROR' },
        regionId: -100,
      }
      return { ...renderData, ...emptyBaseData }
    })
  }, [])

  // Create the room shapes using combined data
  const { roomShapes } = useShapes({ combinedRoomData })

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        className="bg-stone-900"
        gl={{ alpha: false }}
        frameloop="demand"
      >
        <ambientLight intensity={0.5} />
        <Controls />
        {roomShapes}
      </Canvas>
    </div>
  )
}
