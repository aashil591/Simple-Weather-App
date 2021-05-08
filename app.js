window.addEventListener('load', () => {
	let long, lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimeZone = document.querySelector('.location-timezone');
	let imageSrc = document.querySelector('.temp-img');
	let temperatureSection = document.querySelector('.degree-section');
	let humidityLevel = document.querySelector('.humidity-level');
	let coordinates = document.querySelector('.coordinates');
	const temperatureSpan = document.querySelector('.degree-section span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const api = `http://api.weatherstack.com/current?access_key=8e1a3fd17ac6d1b94bc05d8ddcf87c17&query=${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					const { temperature, weather_descriptions, weather_icons, humidity } = data.current;
					const { lat, lon } = data.location;

					// Set DOM Elements from the API.
					temperatureDegree.textContent = `It's ${temperature}`;
					temperatureDescription.textContent = weather_descriptions[0];
					locationTimeZone.textContent = data.location.timezone_id;
					humidityLevel.textContent = `Humidity : ${humidity}`;
					coordinates.textContent = `Lat : ${lat} Long: ${long}`;

					// fahrenheit Formula.
					let fahrenheit = (temperature * (9 / 5)) + 32;

					// Icons.
					imageSrc.src = weather_icons;

					// Change temp to F/C.
					temperatureSection.addEventListener('click', () => {
						if (temperatureSpan.textContent === "C") {
							temperatureSpan.textContent = "F";
							temperatureDegree.textContent = Math.floor(fahrenheit);
						} else {
							temperatureSpan.textContent = "C";
							temperatureDegree.textContent = temperature;
						}
					});
				})
		});

	}

});