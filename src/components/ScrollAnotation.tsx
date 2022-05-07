import React, { FC } from 'react';
import { css } from '@emotion/css';

export const ScrollAnotation: FC = () => {
	return (
		<div className={styles.container}>
			<span className={styles.text}>Scroll to adjust irradiation range</span>
		</div>
	)
}

const styles = {
	container: css`
		position: absolute;
		bottom: 20px;
		left: 20px;
	`,
	text: css`
		font-size: 1rem;
		color: #fff;
	`
}
