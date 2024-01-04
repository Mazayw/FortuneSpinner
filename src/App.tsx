import './App.css';
const prices = [1, 2, 3, 5, 6, 7, 8];
function App() {
	const randomColor = () =>
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0');

	return (
		<div className='container'>
			<button>Spin</button>
			<span className='arrow'></span>
			<div
				className='wheel'
				style={
					{
						'--deg': `${Math.ceil(360 / prices.length)}deg`,
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
						<div className={`sector`} style={style} key={el}>
							<span>{el}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
