/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import {useSphere} from "@react-three/cannon";

type GLTFResult = GLTF & {
  nodes: {
    basket_ball: THREE.Mesh
  }
  materials: {
    pbr: THREE.MeshStandardMaterial
  }
}

const FILE_URL = "https://d1p3v0j4bqcb21.cloudfront.net/models/ball1-1634879067/ball1.glb.gz";

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult
  const [ collider ] = useSphere(() => ({
    mass: 0.1,
    position: [0, 15, -5],
    linearFactor: [0.75, 1.5, 0.75],
    sleepSpeedLimit: 10,
    angularFactor: [1.25, 1.25, 1.25],
  }))

  return (
    <group ref={group} dispose={null}>
      <group name="Scene" {...props}>
        <mesh
          name="basket_ball"
          ref={collider}
          geometry={nodes.basket_ball.geometry}
          material={materials.pbr}
        />
      </group>
    </group>
  )
}

useGLTF.preload(FILE_URL)
