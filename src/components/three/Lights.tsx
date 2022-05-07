import { FC, useRef } from 'react';
import { lerp } from 'three/src/math/MathUtils';
import { Cone } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import fragmentShader from '../../modules/glsl/fakeGodRaysFrag.glsl';
import vertexShader from '../../modules/glsl/fakeGodRaysVert.glsl';
import { sceneState } from '../../modules/store';

export const Lights: FC = () => {
	const mainLightRef = useRef<THREE.SpotLight>(null)
	const subLightRef = useRef<THREE.SpotLight>(null)
	const rayRef = useRef<THREE.Mesh>(null)

	const shader: THREE.Shader = {
		uniforms: {},
		vertexShader,
		fragmentShader
	}

	let lightProgress = sceneState.lightProgress
	useFrame(() => {
		lightProgress = lerp(lightProgress, sceneState.lightProgress, 0.1)

		mainLightRef.current!.angle = (Math.PI / 12) * lightProgress
		subLightRef.current!.intensity = 2 * Math.pow(lightProgress, 3)
		rayRef.current!.scale.set(lightProgress, 1, lightProgress)
	})

	return (
		<group position-z={5}>
			<spotLight
				ref={mainLightRef}
				intensity={10}
				color="#fefdb2"
				position={[0, 5, 0]}
				angle={Math.PI / 12}
				distance={10}
				penumbra={0.8}
				decay={3.5}
				castShadow
				shadow-mapSize={[1024, 1024]}
			/>
			<spotLight
				ref={subLightRef}
				intensity={2}
				position={[0, 5, -4]}
				angle={Math.PI / 12}
				distance={10}
				penumbra={0.8}
				decay={3.5}
			/>
			<Cone ref={rayRef} position={[0, 2, -3]} rotation-x={Math.PI / 4} args={[2.6, 15, 256, 1, true]}>
				<shaderMaterial args={[shader]} transparent />
			</Cone>
		</group>
	)
}
