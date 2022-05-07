import gsap from 'gsap';
import React, { FC, useEffect } from 'react';
import { css } from '@emotion/css';
import { Html, useProgress } from '@react-three/drei';
import { loadingState, sceneState } from '../../modules/store';

export const Loading: FC = () => {
	useEffect(() => {
		return () => {
			loadingState.completed = true
			gsap.to(sceneState, { lightProgress: 1, duration: 2, delay: 0.5, ease: 'none' })
		}
	}, [])

	return null
}
