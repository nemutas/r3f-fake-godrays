import { Camera } from '../types/types';

export const cameraSet: { [key in string]: Camera } = {
	camera1: {
		name: 'original',
		position: [4, 1.5, 4],
		target: [0, 1.5, 2.5]
	},
	camera2: {
		name: 'pray',
		position: [0, 0.55, 3],
		target: [0, 0.7, 0]
	}
}
