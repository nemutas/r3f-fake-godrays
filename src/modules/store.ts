import * as THREE from 'three';
import { proxy } from 'valtio';
import { SceneState } from '../types/types';
import { cameraSet } from './datas';

export const sceneState: SceneState = {
	lightProgress: 0,
	hoveredFigure: false,
	camera: cameraSet.camera1,
	cameraTargetProgress: new THREE.Vector3(...cameraSet.camera1.target)
}

export const loadingState = proxy<{ completed: boolean }>({ completed: false })
