import { useState } from 'react';
import './App.css';
import { prices } from './config/data';
import { Circle } from './Circle';

function App() {
	const [degree, setDegree] = useState(0);

	function getRandomValueWithProbability(pricesData: typeof prices) {
		const random = Math.random();
		let cumulativeProbability = 0;
		for (const price of pricesData) {
			cumulativeProbability += price.probability;
			if (random <= cumulativeProbability) {
				return { priceValue: price.value, cumulativeProbability };
			}
		}
		return { priceValue: prices[0].value, cumulativeProbability: 0 };
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
				<Circle />
			</div>
		</div>
	);
}

export default App;
