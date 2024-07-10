import {Box} from "/src/components/Box"
import {OrbitControls, PerspectiveCamera} from "@react-three/drei"
import React, {useRef} from "react"
import {Actor, CollisionType, Color, Engine, Input, Physics} from "excalibur"
import {useFrame} from "@react-three/fiber"
import {Mesh} from "three"
import sceneJSON from "/.ghostlight/scenes/scene.json?raw"

const scene: glScene = JSON.parse(sceneJSON)

const game = new Engine({canvasElement: document.createElement("canvas")})
Physics.acc.setTo(0, -400)

const dataPlayer = scene.actors.find((x) => x.type === "Player")!
const player = new Actor({
  x: dataPlayer.x + dataPlayer.width / 2,
  y: scene.config.height - dataPlayer.y - dataPlayer.height / 2,
  width: dataPlayer.width,
  height: dataPlayer.height,
  color: Color.fromHex(dataPlayer.texture),
  collisionType: CollisionType.Active,
})
player.on("preupdate", () => {
  player.vel.x = 60 * (+game.input.keyboard.isHeld(Input.Keys.Right) - +game.input.keyboard.isHeld(Input.Keys.Left))
  // player.vel.y = 60 * (+game.input.keyboard.isHeld(Input.Keys.Up) - +game.input.keyboard.isHeld(Input.Keys.Down))
  if (game.input.keyboard.wasPressed(Input.Keys.Space)) player.vel.y = 200
})
game.add(player)

const floors: Actor[] = []
scene.actors.filter((x) => x.type === "Floor").forEach((data) => {
  const floor = new Actor({
    x: data.x + data.width / 2,
    y: scene.config.height - data.y - data.height / 2,
    width: data.width,
    height: data.height,
    color: Color.fromHex(data.texture),
    collisionType: CollisionType.Fixed,
  })
  floors.push(floor)
  game.add(floor)
})

game.start()

export const World = () => {
  const refPlayer = useRef<Mesh>(null!)

  useFrame((three) => {
    refPlayer.current.position.x = player.pos.x
    refPlayer.current.position.y = player.pos.y
    three.camera.position.x = player.pos.x
    three.camera.position.y = player.pos.y
    three.camera.lookAt(player.pos.x, player.pos.y, 0)
  })

  return (<>
    <axesHelper args={[160]}/>
    <gridHelper args={[500, 50]}/>
    <PerspectiveCamera
      makeDefault
      position={[player.pos.x, player.pos.y, 150]}
    />
    <OrbitControls/>
    <ambientLight intensity={0.5}/>
    <pointLight
      position={[scene.config.width / 2, scene.config.height / 2, 50]}
      intensity={0.5}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
    />
    <Box
      refMesh={refPlayer}
      position={[player.pos.x, player.pos.y, 5]}
      size={[player.width, player.height, 10]}
      color={player.color.toHex()}
    />
    {floors.map((floor) => (
      <Box
        key={floor.id}
        position={[floor.pos.x, floor.pos.y, 5]}
        size={[floor.width, floor.height, 10]}
        color={floor.color.toHex()}
      />
    ))}
    <Box
      position={[scene.config.width / 2, scene.config.height / 2, -5]}
      size={[scene.config.width, scene.config.height, 10]}
      color="#334155"
    />
  </>)
}
