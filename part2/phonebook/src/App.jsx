import { useState, useEffect } from 'react';
import personService from './service/person';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchWord, setSearchWord] = useState('');
	const [message, setMessage] = useState(null);
	const [notificationType, setNotificationType] = useState('');

	useEffect(() => {
		personService.getAll().then((initialPersons) => setPersons(initialPersons));
	}, []);

	const handleSubmitNewEntry = (event) => {
		event.preventDefault();
		if (newName === '' || newNumber === '') {
			alert('Please fill the add a new form');
		} else {
			const duplicatePerson = persons.find(
				(person) => person.name.toLowerCase() === newName.toLowerCase()
			);
			if (duplicatePerson) {
				updatePerson(duplicatePerson);
				return;
			}
			const newPerson = { name: newName, number: newNumber };
			personService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				showSuccessNotification(returnedPerson.name);
				setNewName('');
				setNewNumber('');
			});
		}
	};

	const updatePerson = (duplicatePerson) => {
		if (
			confirm(
				`${duplicatePerson.name} is already added to phonebook, replace the old number with a new one?`
			)
		) {
			personService
				.update(duplicatePerson.id, {
					name: duplicatePerson.name,
					number: newNumber,
				})
				.then((returnedPerson) => {
					setPersons(
						persons.map((person) =>
							person.id !== returnedPerson.id ? person : returnedPerson
						)
					);
				});
		}
		setNewName('');
		setNewNumber('');
	};

	const showSuccessNotification = (name) => {
		setMessage(`Added ${name}`);
		setNotificationType('success');
		setTimeout(() => {
			setMessage(null);
			setNotificationType('');
		}, 5000);
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
			<Notification message={message} type={notificationType} />
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
