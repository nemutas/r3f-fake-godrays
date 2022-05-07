import React, { FC } from 'react';
import { css } from '@emotion/css';
import { sceneState } from '../modules/store';
import { LinkIconButton } from './LinkIconButton';
import { Loading } from './Loading';
import { MouseTracker } from './MouseTracker';
import { ScrollAnotation } from './ScrollAnotation';
import { TCanvas } from './three/TCanvas';

export const App: FC = () => {
	const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		if (e.deltaY > 0) {
			sceneState.lightProgress -= 0.05
			sceneState.lightProgress = Math.max(sceneState.lightProgress, 0)
		} else {
			sceneState.lightProgress += 0.05
			sceneState.lightProgress = Math.min(sceneState.lightProgress, 1)
		}
	}

	return (
		<div className={styles.container} onWheel={handleWheel}>
			<TCanvas />
			<MouseTracker />
			<ScrollAnotation />
			<LinkIconButton imagePath="assets/icons/github.svg" linkPath="https://github.com/nemutas/r3f-fake-godrays" />
			<Loading />
		</div>
	)
}

const styles = {
	container: css`
		position: relative;
		width: 100vw;
		height: 100vh;
	`
}
