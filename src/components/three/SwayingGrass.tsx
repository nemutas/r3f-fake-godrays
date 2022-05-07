import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import { lerp } from 'three/src/math/MathUtils';
import { useFrame } from '@react-three/fiber';
import fragmentShader from '../../modules/glsl/swayingGrassFrag.glsl';
import vertexShader from '../../modules/glsl/swayingGrassVert.glsl';
import { sceneState } from '../../modules/store';

export const SwayingGrass: FC = () => {
	const meshRef = useRef<THREE.InstancedMesh>(null)

	// --------------------------------------------
	// sampling geometry

	const samplingGeometry = useMemo(() => {
		const geometry = new THREE.PlaneGeometry(10, 10).toNonIndexed()
		geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
		return geometry
	}, [])

	// --------------------------------------------
	// create sampler

	const sampler = useMemo(() => {
		const samplingMesh = new THREE.Mesh(samplingGeometry, new THREE.MeshBasicMaterial())
		const sampler = new MeshSurfaceSampler(samplingMesh).build()
		return sampler
	}, [samplingGeometry])

	// --------------------------------------------
	// initialize matrix

	const amount = 20000 // 20k

	const updateMatrix = useCallback(() => {
		const object = new THREE.Object3D()
		const samplingPosition = new THREE.Vector3()
		const samplingNormal = new THREE.Vector3()
		const getScale = () => {
			return [0.6, 0.6, 0.3 + Math.random() * 0.3] as [number, number, number]
		}

		for (let i = 0; i < amount; i++) {
			sampler.sample(samplingPosition, samplingNormal)
			object.position.copy(samplingPosition)
			object.lookAt(samplingNormal.add(samplingPosition))
			object.scale.set(...getScale())
			object.updateMatrix()

			meshRef.current!.setMatrixAt(i, object.matrix)
		}
		meshRef.current!.instanceMatrix.needsUpdate = true
	}, [amount, sampler])

	useEffect(() => {
		// fixed cone matrix
		meshRef.current!.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2))
		meshRef.current!.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.5))

		updateMatrix()
	}, [updateMatrix])

	// --------------------------------------------
	// create shader

	const shader: THREE.Shader = {
		uniforms: {
			u_time: { value: 0 },
			u_sway: { value: 0.2 },
			u_lightProgress: { value: sceneState.lightProgress }
		},
		vertexShader,
		fragmentShader
	}

	let lightProgress = sceneState.lightProgress
	useFrame(() => {
		lightProgress = lerp(lightProgress, sceneState.lightProgress, 0.1)

		shader.uniforms.u_time.value += 0.005
		shader.uniforms.u_lightProgress.value = lightProgress
	})

	return (
		<group>
			<mesh geometry={samplingGeometry}>
				<meshBasicMaterial color="#000" />
			</mesh>
			<instancedMesh ref={meshRef} args={[undefined, undefined, amount]}>
				<coneGeometry args={[0.05, 1.0, 2, 20, false, 0, Math.PI]} />
				<shaderMaterial args={[shader]} side={THREE.DoubleSide} />
			</instancedMesh>
		</group>
	)
}
