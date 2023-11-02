const CountryView = ({ country }) => {
	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital[0]}</p>
			<p>area {country.area}</p>
			<p>
				<strong>languages:</strong>
			</p>
			<ul>
				{Object.keys(country.languages).map((lang) => (
					<li key={lang}>{country.languages[lang]}</li>
				))}
			</ul>
			<img src={country.flags.png} alt={country.flags.alt} />
		</div>
	);
};

export default CountryView;
