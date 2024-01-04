import React, { memo } from 'react';
import { prices } from './config/data';

export const Circle = memo(() => {
	const randomColor = () =>
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0');
	return (
		<>
			{prices.map((el, index) => {
				const color = randomColor();
				const style = {
					'--i': index,
					'--clr': `#${color}`,
				} as React.CSSProperties;
				return (
					<div className={`sector`} style={style} key={el.value}>
						<span>{el.value}</span>
					</div>
				);
			})}
		</>
	);
});
