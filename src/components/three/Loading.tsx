import React, { FC, useEffect } from 'react';
import { css } from '@emotion/css';
import { Html, useProgress } from '@react-three/drei';
import { loadingState } from '../../modules/store';

export const Loading: FC = () => {
	useEffect(() => {
		return () => {
			loadingState.completed = true
			console.log('loadingState.completed')
		}
	}, [])

	return null
}
