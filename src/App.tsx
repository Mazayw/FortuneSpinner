import { useState } from 'react';
import './App.css';
import { prices } from './config/data';
import { Circle } from './Circle';

function App() {
	const [degree, setDegree] = useState(0);
	const [rotates, setRotates] = useState(5);
	const [prize, setPrize] = useState(prices[0].value);

	function getRandomValueWithProbability(pricesData: typeof prices) {
		const random = Math.random();
		let cumulativeProbability = 0;
		for (let i = 0; i <= pricesData.length; i++) {
			const price = pricesData[i];
			cumulativeProbability += price.probability;
			if (random <= cumulativeProbability) {
				return {
					priceValue: price.value,
					cumulativeProbability: (360 / pricesData.length) * i,
				};
			}
		}
		return {
			priceValue: prices[0].value,
			cumulativeProbability: 360 / pricesData.length,
		};
	}

	const rotate = () => {
		const randomValue = getRandomValueWithProbability(prices);
		const degreeNew = randomValue;
		setDegree(
			(prev) => prev * 0 + degreeNew.cumulativeProbability + 360 * rotates
		);
		setRotates((prev) => prev + 5);
		setPrize(randomValue.priceValue);
	};

	return (
		<>
			{' '}
			<h1>{prize}</h1>
			<div className='container'>
				<button onClick={rotate}>Spin</button>
				<span className='arrow'></span>
				<div
					className='wheel'
					style={
						{
							'--deg': `${Math.ceil(360 / prices.length)}deg`,
							transform: `rotate(-${degree}deg)`,
						} as React.CSSProperties
					}
				>
					<Circle />
				</div>
			</div>
		</>
	);
}

export default App;
