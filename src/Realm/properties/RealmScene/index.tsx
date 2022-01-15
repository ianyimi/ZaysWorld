import { useRealm } from "../../components/RealmState";
import { usePlayer } from "spacesvr";
import { useEffect } from "react";
import Cubes from "./Cubes"
import Matrix from "./Matrix";
import Moon from "./Moon";
import Penthouse from "./Penthouse";
import Glacier from "./Glacier";
import Flashlight from "../../../Home/components/Flashlight";
import {useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

export function RealmScene() {

  const { scene: { name, type } } = useRealm();
  // const { raycaster } = usePlayer();
  const { camera } = useThree();
  console.log(camera)

  // useEffect(() => {
  //   raycaster.far = 7;
  // },[]);

  return (
    <group>
      <OrbitControls autoRotate />
      <ambientLight intensity={1} />
      {/*<ambientLight intensity={0.05} />*/}
      {name === "Cubes" && <Cubes />}
      {name === "Matrix" && <Matrix />}
      {name === "Moon" && <Moon />}
      {name === "Penthouse" && <Penthouse />}
      {name === "Glacier" && <Glacier />}
      {/*<Flashlight />*/}
    </group>
  )
}
