import React, { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { css } from '@emotion/css';
import { sceneState } from '../modules/store';

export const MouseTracker: FC = () => {
	const ref = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLSpanElement>(null)
	const animeID = useRef<number>()

	useEffect(() => {
		const currentPos = new THREE.Vector2()
		const targetPos = new THREE.Vector2()
		const handleMouseMove = (e: MouseEvent) => {
			targetPos.set(e.clientX, e.clientY)
		}

		window.addEventListener('mousemove', handleMouseMove)

		const anime = () => {
			currentPos.lerp(targetPos, 0.1)
			ref.current!.style.setProperty('--x', currentPos.x + 'px')
			ref.current!.style.setProperty('--y', currentPos.y + 'px')

			ref.current!.classList.toggle('active', sceneState.hoveredFigure)
			textRef.current!.classList.toggle('active', sceneState.hoveredFigure)
			textRef.current!.textContent = sceneState.camera.name === 'pray' ? 'back' : 'pray'

			animeID.current = requestAnimationFrame(anime)
		}

		anime()

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			animeID.current && cancelAnimationFrame(animeID.current)
		}
	}, [])

	return (
		<div ref={ref} className={styles.container}>
			<span ref={textRef} className={styles.text} />
		</div>
	)
}

const styles = {
	container: css`
		position: absolute;
		top: var(--y);
		left: var(--x);
		width: 10px;
		height: 10px;
		border: 5px solid #fff;
		border-radius: 50%;
		box-shadow: 0 0 10px #fff, 0 0 20px #fff;
		transform: translate(-50%, -50%);
		user-select: none;
		pointer-events: none;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: width 0.5s, height 0.5s, border 0.5s;

		&.active {
			width: 200px;
			height: 200px;
			border: 2px solid #fff;
		}
	`,
	text: css`
		color: rgba(255, 255, 255, 0.5);
		font-size: 2rem;
		opacity: 0;
		transition: opacity 0.1s;

		&.active {
			opacity: 1;
		}
	`
}
