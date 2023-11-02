import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = import.meta.env.VITE_API_KEY;

const CountryView = ({ country }) => {
	const [weather, setWeather] = useState(null);
	useEffect(() => {
		axios
			.get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&appid=${api_key}`
			)
			.then(({ data }) =>
				axios.get(
					`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${api_key}`
				)
			)
			.then(({ data }) =>
				setWeather({
					temp: data.main.temp,
					wind: data.wind.speed,
					icon: data.weather[0].icon,
				})
			);
	}, [country]);

	const convertKelvinToCelcius = (kelvin) => (kelvin - 273.15).toFixed(2);

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
			<h3>Weather in {country.capital[0]}</h3>
			{weather ? (
				<div>
					<p>temperature {convertKelvinToCelcius(weather.temp)} celcius</p>
					<img
						src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
						alt="weather icon"
					/>
					<p>wind {weather.wind} m/s</p>
				</div>
			) : (
				<p>Loading weather data...</p>
			)}
		</div>
	);
};

export default CountryView;
