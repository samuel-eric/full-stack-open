import { useState } from 'react';

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Statistics = (props) => {
	const { good, neutral, bad } = props;

	if (good === 0 && neutral === 0 && bad === 0) {
		return (
			<div>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</div>
		);
	}

	const all = good + neutral + bad;
	const averageScore = (good - bad) / all;
	const positivePercentage = (good / all) * 100 + '%';

	return (
		<div>
			<h1>statistics</h1>
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={all} />
					<StatisticLine text="average" value={averageScore} />
					<StatisticLine text="positive" value={positivePercentage} />
				</tbody>
			</table>
		</div>
	);
};

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodFeedback = () => () => setGood(good + 1);
	const handleNeutralFeedback = () => () => setNeutral(neutral + 1);
	const handleBadFeedback = () => () => setBad(bad + 1);

	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" handleClick={handleGoodFeedback()} />
			<Button text="neutral" handleClick={handleNeutralFeedback()} />
			<Button text="bad" handleClick={handleBadFeedback()} />

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
