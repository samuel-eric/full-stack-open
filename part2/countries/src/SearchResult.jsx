import CountryView from './CountryView';

const SearchResult = ({ results, selectedCountry, setSelectedCountry }) => {
	const handleViewCountry = (id) => {
		const country = results.find((result) => result.cca3 === id);
		setSelectedCountry(country);
	};

	if (selectedCountry) {
		return <CountryView country={selectedCountry} />;
	}
	if (results.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}
	if (results.length === 1) {
		const country = results[0];
		return <CountryView country={country} />;
	}
	return (
		<div>
			{results.map((result) => (
				<div key={result.cca3}>
					{result.name.common}{' '}
					<button onClick={() => handleViewCountry(result.cca3)}>show</button>
				</div>
			))}
		</div>
	);
};

export default SearchResult;
