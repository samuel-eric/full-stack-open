import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchWord, setSearchWord] = useState('');

	const handleSubmitNewEntry = (event) => {
		event.preventDefault();
		if (
			persons.find(
				(person) => person.name.toLowerCase() === newName.toLowerCase()
			)
		) {
			alert(`${newName} is already added to phonebook`);
			setNewName('');
			return;
		}
		const updatedPersons = persons.concat({ name: newName, number: newNumber });
		setPersons(updatedPersons);
		setNewName('');
		setNewNumber('');
	};

	const handleAddName = (event) => {
		setNewName(event.target.value);
	};

	const handleAddNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearch = (event) => {
		setSearchWord(event.target.value);
	};

	const personsToShow = searchWord
		? persons.filter(
				(person) => person.name.toLowerCase().includes(searchWord.toLowerCase())
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  )
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with <input value={searchWord} onChange={handleSearch} />
			</div>
			<h2>Add a new</h2>
			<form onSubmit={handleSubmitNewEntry}>
				<div>
					name: <input value={newName} onChange={handleAddName} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleAddNumber} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{personsToShow.map((person) => (
					<p key={person.id}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	);
};

export default App;
