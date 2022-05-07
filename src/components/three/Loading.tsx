import { FC, useEffect } from 'react';
import { loadingState } from '../../modules/store';

export const Loading: FC = () => {
	useEffect(() => {
		return () => {
			loadingState.completed = true
		}
	}, [])

	return null
}
