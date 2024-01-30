		
			let userCity = document.getElementById("cityLocation");
			let searchCity = document.getElementById("cityButton");
			console.log("USER CITY: " + userCity);
			

			const url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
			const key = "13c8b075ea41b54d698314da7f8ecfd6";

			function dateTime(){
				//Get date
				const findDate = new Date(); // current date
					const dateFormat = {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					}; // End of format

					//Date
					const currentDate = findDate.toLocaleDateString(undefined, dateFormat);
					console.log("DATE: " + currentDate); // Log date
					let date = document.getElementsByClassName("dateTime")[0].innerHTML = currentDate;

					//Time
					const currentTime = findDate.toLocaleTimeString('en-US');
					console.log("TIME: " + currentTime);
					let time = document.getElementById("Time").innerHTML = currentTime;

					return date; // returns the final date in case of future use
					return time; // returns the final time in case of future use
			} // End of function dateTime

			//Bad input function
			async function badInput(userCity){
				const weatherData = await fetch(url + userCity + `&appid=${key}`); // Fetch data
				let weatherDataJSON = await weatherData.json(); // Retreives JSON form

				let errorMessage = weatherDataJSON.cod; // Gathers potential 404 error message

				//Check for 404 errors
				if(errorMessage == '404'){
					alert("The city could not be found! Please try again!");
				} // end of if statement

			} // End of badInput

			//Icon function
			async function iconSelect(userCity, temperature){
				
				const weatherData = await fetch(url + userCity + `&appid=${key}`); // Fetch data
				let weatherDataJSON = await weatherData.json(); // Retreives JSON form
				let iconImg = document.getElementById("iconPic"); 

				let weatherIcon = weatherDataJSON.weather[0].main; // Get weather status

				console.log("ICON TEMP: " + await temperature); // Log temp for verification

				/*Check for the following weather conditions: 
				* - Cloudy
				* - Clear skies
				* - Snow (Or ice)
				* - Rain
				* - NOTE: Might want to switch cases
				*/
				console.log("WEATHER COND: " + weatherIcon);
				if(weatherIcon == "Clouds" && await temperature > 32){
					console.log("CLOUDS_COND");
					iconImg.src = "webAppIcons/cloudy.png";
				}else if(weatherIcon == "Clear" && await temperature > 32){
					console.log("SUN_COND");
					iconImg.src = "webAppIcons/sun.png";
				}else if(weatherIcon == "Snow"){
					console.log("SNOW_COND");
					iconImg.src = "webAppIcons/snow.png";
				}else if(weatherIcon == "Rain" && await temperature > 32){
					console.log("RAIN_COND");
					iconImg.src = "webAppIcons/partial_rain.png";
				}else if(weatherIcon == "Clear" && await temperature < 32){
					console.log("FREEZE_COND");
					iconImg.src = "webAppIcons/ice.png";
				}else if(weatherIcon == "Clouds" && await temperature < 32){
					console.log("FREEZE_COND");
					iconImg.src = "webAppIcons/ice.png";
				}else if(weatherIcon == "Rain" && await temperature < 32){
					console.log("FREEZE_COND");
					iconImg.src = "webAppIcons/ice.png";
				}else{
					iconImg.src = "webAppIcons/sun.png";
				} // End of if/else statements

				weatherIcon = 'null'; //reset weather value

			} // End of iconSelect


			async function logWeather(userCity){

				const weatherData = await fetch(url + userCity + `&appid=${key}`); // Fetch data

				let weatherDataJSON = await weatherData.json(); // Retreives JSON form

				console.log("WEATHER DATA: ");
				console.log(weatherDataJSON); // Log data


				let temperature = JSON.stringify(weatherDataJSON.main.temp) + "&degF"; //temperature variable
				let city = JSON.stringify(weatherDataJSON.name); // city variable
				let tempValue = weatherDataJSON.main.temp; // Record temp for icon function
				let newTemp = temperature.replace('Â', '');
				
				console.log(temperature); // Log temp for verification
				console.log("NEW TEMP" + newTemp); // Log temp for verification
				console.log(city); // Log city for verification
				console.log("LOGWEATHER TEMP: " + tempValue); // Log temp for verification

				//.replace('Â', '')
				//<script type="text/javascript" src="normanWeatherApp.js"></script>
				//The temp value and city name will be used for the weather app
				let finalTemp = document.getElementsByClassName("degree")[0].innerHTML = temperature; //insert to the
				let finalLocation = document.getElementsByClassName("location")[0].innerHTML = city.replace(/["]+/g, '');

				return tempValue; // returns the temperature value for icon function

			} // End of logWeather

			function displayBuffer(){
				document.getElementById("loader").style.display = "flex";
			} // End of displayBuffer
			function removeBuffer(){
				document.getElementById("loader").style.display = "none";
			} // End of displayBuffer

			dateTime(); // Activate dateTime

			//Listens for the 'enter' key
			userCity.addEventListener('keydown', (event) => {
      			if (event.key === 'Enter') {
					badInput(userCity.value); // Checks for a bad input
					iconSelect(userCity.value, logWeather(userCity.value)); // Call iconSelect and gets value of city
					logWeather(userCity.value); // Call logWeather and gets value of city
      			} // End of if statement
    		}); // End of listener

			
			//Listens for the 'submit' button (MIGHT REMOVE LATER)
			/*searchCity.addEventListener("click", ()=>{
				iconSelect(userCity.value); // Call iconSelect and gets value of city
				logWeather(userCity.value); // Call logWeather and gets value of city
			})	// End of listener*/