import { useState, useEffect } from 'react';
import Search from './Search';
import SearchResult from './SearchResult';
import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const App = () => {
	const [value, setValue] = useState('');
	const [allCountries, setAllCountries] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);

	const handleChange = (event) => {
		setValue(event.target.value);
		searchCountries(event.target.value);
		setSelectedCountry(null);
	};

	const searchCountries = (value) => {
		if (value) {
			setSearchResults(
				allCountries.filter((country) =>
					country.name.common.toLowerCase().includes(value)
				)
			);
		} else {
			setSearchResults([]);
		}
	};

	useEffect(() => {
		axios.get(baseUrl).then((response) => {
			setAllCountries(response.data);
		});
	}, []);

	return (
		<div>
			<Search value={value} handleChange={handleChange} />
			{searchResults.length === 0 && (
				<p>
					{allCountries.length === 0
						? 'please wait, loading all countries'
						: 'start searching'}
				</p>
			)}
			<SearchResult
				results={searchResults}
				selectedCountry={selectedCountry}
				setSelectedCountry={setSelectedCountry}
			/>
		</div>
	);
};

export default App;
