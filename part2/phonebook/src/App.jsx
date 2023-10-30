import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-1234567' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

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

	return (
		<div>
			<h2>Phonebook</h2>
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
				{persons.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	);
};

export default App;
