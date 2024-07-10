import {Canvas} from "@react-three/fiber"
import {World} from "/src/components/World"

export let Root = () => {
  return (
    <main className="h-screen">
      <Canvas dpr={window.devicePixelRatio} shadows><World/></Canvas>
    </main>
  )
}
