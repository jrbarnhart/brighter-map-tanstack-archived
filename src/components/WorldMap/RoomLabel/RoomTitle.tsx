import { Text } from '@react-three/drei'

type RoomTitleProps = {
  name: string
}

export default function RoomTitle({ name }: RoomTitleProps) {
  return (
    <>
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
    </>
  )
}
