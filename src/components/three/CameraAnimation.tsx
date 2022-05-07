import React, { FC } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { sceneState } from '../../modules/store';

export const CameraAnimation: FC = () => {
	const target = new THREE.Vector3()

	return useFrame(({ camera }) => {
		target.set(...sceneState.camera.position)
		camera.position.lerp(target, 0.05)

		target.set(...sceneState.camera.target)
		sceneState.cameraTargetProgress.lerp(target, 0.1)
		camera.lookAt(sceneState.cameraTargetProgress)
	})
}
