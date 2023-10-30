import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');

	const handleSubmitNewName = (event) => {
		event.preventDefault();
		const updatedPersons = persons.concat({ name: newName });
		setPersons(updatedPersons);
		setNewName('');
	};

	const handleAddName = (event) => {
		setNewName(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmitNewName}>
				<div>
					name: <input value={newName} onChange={handleAddName} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map((person) => (
					<p key={person.name}>{person.name}</p>
				))}
			</div>
		</div>
	);
};

export default App;
