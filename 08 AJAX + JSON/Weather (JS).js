window.onload = function () {
    const API_key = "b6be77f0d165f6f01312ad15b38ef3f7";
    var city_name = "Islamabad";

    const mode = (arr) =>
        arr.reduce((a, b, _i, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), null)
    const average = (arr) =>
        arr.reduce((p, c) => p + c, 0) / arr.length;

    navigator.geolocation ? navigator.geolocation.getCurrentPosition(WeatherCoords, WeatherCity) : WeatherCity;
    document.getElementById("search").onkeydown = CityList;
    document.getElementById("getWeather").onclick = WeatherCity;

    function CityList() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = showCities;
        xhr.open("GET", "CitiesList.json", true);
        xhr.send(null);
    }
    function showCities() {
        if (this.readyState == 4 && this.status == 200) {
            let cities = JSON.parse(this.responseText);
            document.getElementById("dropdown").innerHTML = "";
            cities.forEach(function (city) {
                let value = document.getElementById("search").value;
                if ((city.name.toLowerCase().startsWith(value.toLowerCase()) || city.country.toLowerCase().startsWith(value.toLowerCase())) && value != '') {
                    let CitySpan = document.createElement("span");
                    CitySpan.innerHTML = city.name + ", " + city.country + "<br>";
                    CitySpan.onclick = function () {
                        city_name = city.name;
                        document.getElementById("dropdown").innerHTML = "";
                        document.getElementById("search").value = city.name + ", " + city.country;
                    }
                    document.getElementById("dropdown").appendChild(CitySpan);
                }
            });
        }
    }

    function WeatherCity() {
        document.getElementById("search").value = '';
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = showWeather;
        xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`, true);
        xhr.send(null);
        ForecastCity();
    }
    function WeatherCoords(position) {
        let lat = position.coords.latitude, lon = position.coords.longitude;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = showWeather;
        xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`, true);
        xhr.send(null);
        ForecastCoords(lat, lon);
    }
    function ForecastCity() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = showForecast;
        xhr.open("GET", `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}&units=metric`, true);
        xhr.send(null);
    }
    function ForecastCoords(lat, lon) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = showForecast;
        xhr.open("GET", `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`, true);
        xhr.send(null);
    }
    function showWeather() {
        if (this.readyState == 4 && this.status == 200) {
            let weather = JSON.parse(this.responseText);
            document.getElementById("date").innerHTML = new Date().toUTCString();
            document.getElementById("loc").innerHTML = weather.name + ", " + weather.sys.country;
            document.getElementById("icon").src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
            document.getElementById("temp").innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
            document.getElementById("additional").innerHTML =
                `<tr><th>Feels like ${Math.round(weather.main.feels_like)}&deg;C</th>
                <th>${weather.weather[0].description}</th></tr>
                <tr><td>Wind Speed: &ensp; ${Math.round(weather.wind.speed * 10) / 10}m/s</td> 
                <td>Pressure: &ensp; ${weather.main.pressure}hPa</td></tr>
                <tr><td>Humidity: &ensp; ${weather.main.humidity}%</td> 
                <td>Visibility: &ensp; ${weather.visibility / 1000}km</td></tr> 
                <tr><td>Sunrise: &ensp; ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</td> 
                <td>Sunset: &ensp; ${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</td></tr>`;
        }
    }
    function showForecast() {
        if (this.readyState == 4 && this.status == 200) {
            let weather = JSON.parse(this.responseText);
            document.getElementById("label").innerHTML = '5-day forecast';
            for (let i = 0; i < document.getElementsByClassName("days").length; i++) {
                let OneDayMax = [], OneDayMin = [], OneDayPop = [], OneDay = [], OneDayIcon = [];
                for (let j = 8 * i; j < 8 * (i + 1); j++) {
                    try {
                        OneDayMax.push(weather.list[j].main.temp_max);
                        OneDayMin.push(weather.list[j].main.temp_min);
                        OneDayPop.push(weather.list[j].pop);
                        OneDay.push(weather.list[j].weather[0].main);
                        OneDayIcon.push(weather.list[j].weather[0].icon);
                    } catch (error) { }
                }
                document.getElementsByClassName("days")[i].innerHTML =
                    `<td>${new Date(weather.list[8 * i].dt * 1000).toDateString()}</td>
                    <img src="https://openweathermap.org/img/wn/${mode(OneDayIcon)}.png">
                    <td>${Math.round(Math.max(...OneDayMax))}/${Math.round(Math.min(...OneDayMin))}&deg;C</td>
                    <td>${mode(OneDay)}</td>
                    <td><i class="fa-solid fa-droplet fa-sm"></i>&ensp;${Math.round(average(OneDayPop) * 10) * 10}%</td>`;
            }
        }
    }
}