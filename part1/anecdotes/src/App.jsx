import { useState } from 'react';

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	];

	const [selected, setSelected] = useState(0);

	const initialPoints = new Array(anecdotes.length).fill(0);
	const [points, setPoints] = useState(initialPoints);

	const handleClick = () => {
		const randomNumber = Math.floor(Math.random() * anecdotes.length);
		setSelected(randomNumber);
	};

	const addVote = () => {
		const copy = [...points];
		copy[selected]++;
		setPoints(copy);
	};

	const getMaxVoteIndex = () => points.indexOf(Math.max(...points));

	getMaxVoteIndex();

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<h3>{anecdotes[selected]}</h3>
			<p>
				has {points[selected]} {points[selected] <= 1 ? 'vote' : 'votes'}
			</p>
			<button onClick={addVote}>vote</button>
			<button onClick={handleClick}>next anecdote</button>

			<h1>Anecdote with most votes</h1>
			{Math.max(...points) === 0 ? (
				'No anecdote has been voted'
			) : (
				<>
					<h3>{anecdotes[getMaxVoteIndex()]}</h3>
					<p>
						has {points[getMaxVoteIndex()]}{' '}
						{points[getMaxVoteIndex()] <= 1 ? 'vote' : 'votes'}
					</p>
				</>
			)}
		</div>
	);
};

export default App;
