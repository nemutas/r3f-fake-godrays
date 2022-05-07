import { FC, useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Sparkles, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { cameraSet } from '../../modules/datas';
import { sceneState } from '../../modules/store';
import { publicPath } from '../../modules/utils';

type GLTFResult = GLTF & {
	nodes: {
		Statue_Statue_0: THREE.Mesh
	}
	materials: {
		Statue: THREE.MeshStandardMaterial
	}
}

const ModelPath = publicPath('assets/models/GoddessFigure.glb')

export const Model: FC = () => {
	const group = useRef<THREE.Group>(null)
	const sparklesRef = useRef<THREE.Points>(null)
	const { nodes, materials, scene } = (useGLTF(ModelPath) as unknown) as GLTFResult

	materials.Statue.emissive = new THREE.Color('#1c4000')
	materials.Statue.emissiveIntensity = 0.1

	useFrame(() => {
		const attrOpacity = sparklesRef.current!.geometry.getAttribute('opacity')
		const opacity = [...Array(attrOpacity.count)].map(() => sceneState.lightProgress)
		sparklesRef.current!.geometry.setAttribute('opacity', new THREE.BufferAttribute(Float32Array.from(opacity), 1))
	})

	const handleClick = () => {
		if (sceneState.camera.name === 'original') {
			sceneState.camera = cameraSet.camera2
		} else if (sceneState.camera.name === 'pray') {
			sceneState.camera = cameraSet.camera1
		}
		sceneState.hoveredFigure = false
	}

	const handlePointerEnter = () => {
		sceneState.hoveredFigure = true
	}

	const handlePointerLeave = () => {
		sceneState.hoveredFigure = false
	}

	return (
		<group ref={group} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Statue_Statue_0.geometry}
				material={materials.Statue}
				onClick={handleClick}
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
			/>
			<Sparkles ref={sparklesRef} position-y={0.5} count={30} scale={[1.3, 2.2, 1.3]} size={4} speed={0.4} />
		</group>
	)
}

useGLTF.preload(ModelPath)
