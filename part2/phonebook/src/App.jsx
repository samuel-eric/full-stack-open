import { useState, useEffect } from 'react';
import personService from './service/person';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchWord, setSearchWord] = useState('');

	useEffect(() => {
		personService.getAll().then((initialPersons) => setPersons(initialPersons));
	}, []);

	const handleSubmitNewEntry = (event) => {
		event.preventDefault();
		if (
			persons.find(
				(person) => person.name.toLowerCase() === newName.toLowerCase()
			)
		) {
			alert(`${newName} is already added to phonebook`);
			setNewName('');
			setNewNumber('');
			return;
		}
		const newPerson = { name: newName, number: newNumber };
		personService.create(newPerson).then((returnedPerson) => {
			setPersons(persons.concat(returnedPerson));
			setNewName('');
			setNewNumber('');
		});
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

	const handleRemove = (id) => {
		if (
			confirm(`Delete ${persons.find((person) => person.id === id).name} ?`)
		) {
			personService
				.remove(id)
				.then(() => setPersons(persons.filter((person) => person.id !== id)));
		}
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
			<Filter searchWord={searchWord} handleSearch={handleSearch} />
			<h2>Add a new</h2>
			<PersonForm
				handleSubmitNewEntry={handleSubmitNewEntry}
				newName={newName}
				handleAddName={handleAddName}
				newNumber={newNumber}
				handleAddNumber={handleAddNumber}
			/>
			<h2>Numbers</h2>
			<Persons personsToShow={personsToShow} handleRemove={handleRemove} />
		</div>
	);
};

export default App;
