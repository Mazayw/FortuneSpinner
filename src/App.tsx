import { useState } from 'react';
import './App.css';
import { prices } from './config/data';
//const prices = [1, 2, 3, 5, 6, 7, 8];
function App() {
	const [degree, setDegree] = useState(0);

	const randomColor = () =>
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0');

	function getRandomValueWithProbability(pricesData: typeof prices) {
		const random = Math.random();
		let cumulativeProbability = 0;
		for (const price of pricesData) {
			cumulativeProbability += price.probability;
			if (random <= cumulativeProbability) {
				return { priceValue: price.value, cumulativeProbability };
			}
		}
		//return 'No luck';
	}

	const rotate = () => {
		const randomValue = getRandomValueWithProbability(prices);
		setDegree(
			(prev) => prev + (randomValue?.cumulativeProbability || 0) * 360 + 360 * 5
		);
		console.log(randomValue);
	};

	return (
		<div className='container'>
			<button onClick={rotate}>Spin</button>
			<span className='arrow'></span>
			<div
				className='wheel'
				style={
					{
						'--deg': `${Math.ceil(360 / prices.length)}deg`,
						transform: `rotate(${degree}deg)`,
					} as React.CSSProperties
				}
			>
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
			</div>
		</div>
	);
}

export default App;
