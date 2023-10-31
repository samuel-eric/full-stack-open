import Person from './Person';

const Persons = ({ personsToShow, handleRemove }) => {
	return (
		<div>
			{personsToShow.map((person) => (
				<Person key={person.id} person={person} handleRemove={handleRemove} />
			))}
		</div>
	);
};

export default Persons;
