$("document").ready(function () {
    const API_key = "b6be77f0d165f6f01312ad15b38ef3f7";
    var city_name = "Islamabad";

    const mode = (arr) =>
        arr.reduce((a, b, _i, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), null)
    const average = (arr) =>
        arr.reduce((p, c) => p + c, 0) / arr.length;

    navigator.geolocation ? navigator.geolocation.getCurrentPosition(WeatherCoords, WeatherCity) : WeatherCity;
    $("#search").bind("keydown", function () { $.getJSON("CitiesList.json", showCities); });
    $("#getWeather").bind("click", WeatherCity);

    function showCities(cities) {
        $("#dropdown").empty();
        $.each(cities, function (_i, city) {
            let value = $("#search").val();
            if ((city.name.toLowerCase().startsWith(value.toLowerCase()) || city.country.toLowerCase().startsWith(value.toLowerCase())) && value != '') {
                let CitySpan = $(`<span>${city.name}, ${city.country}<br></span>`);
                CitySpan.click(function () {
                    city_name = city.name;
                    $("#dropdown").empty();
                    $("#search").val(city.name + ", " + city.country);
                });
                $("#dropdown").append(CitySpan);
            }
        });
    }
    function WeatherCity() {
        $("#search").val('');
        $.getJSON("https://api.openweathermap.org/data/2.5/weather", { q: city_name, appid: API_key, units: 'metric' }, showWeather);
        $.getJSON("https://api.openweathermap.org/data/2.5/forecast", { q: city_name, appid: API_key, units: 'metric' }, showForecast);
    }
    function WeatherCoords(position) {
        let lat = position.coords.latitude, lon = position.coords.longitude;
        $.getJSON("https://api.openweathermap.org/data/2.5/weather", { lat: lat, lon: lon, appid: API_key, units: 'metric' }, showWeather);
        $.getJSON("https://api.openweathermap.org/data/2.5/forecast", { lat: lat, lon: lon, appid: API_key, units: 'metric' }, showForecast);
    }
    function showWeather(weather) {
        $("#date").html(new Date().toUTCString());
        $("#loc").html(weather.name + ", " + weather.sys.country);
        $("#icon").attr('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
        $("#temp").html(`${Math.round(weather.main.temp)}&deg;C`);
        $("#description").html(`Feels like ${Math.round(weather.main.feels_like)}&deg;C &emsp; ${weather.weather[0].description}`);
        $("#additional").html(`
            <tr><th>Feels like ${Math.round(weather.main.feels_like)}&deg;C</th>
                <th>${weather.weather[0].description}</th></tr>
            <tr><td>Wind Speed: &ensp; ${Math.round(weather.wind.speed * 10) / 10}m/s</td> 
                <td>Pressure: &ensp; ${weather.main.pressure}hPa</td></tr>
            <tr><td>Humidity: &ensp; ${weather.main.humidity}%</td> 
                <td>Visibility: &ensp; ${weather.visibility / 1000}km</td></tr> 
            <tr><td>Sunrise: &ensp; ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</td> 
                <td>Sunset: &ensp; ${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</td></tr>
        `);
    }
    function showForecast(weather) {
        let i = 0;
        $("#label").html('5-day forecast');
        $(".days").each(function () {
            let OneDayMax = [], OneDayMin = [], OneDayPop = [], OneDay = [], OneDayIcon = [];
            for (let j = 8 * i; j < 8 * (i + 1); j++) {
                try {
                    OneDayMax.push(weather.list[j].main.temp_max);
                    OneDayMin.push(weather.list[j].main.temp_min);
                    OneDayPop.push(weather.list[j].pop);
                    OneDay.push(weather.list[j].weather[0].main);
                    OneDayIcon.push(weather.list[j].weather[0].icon)
                } catch (error) { }
            }
            $(this).html(`<td>${new Date(weather.list[8 * i].dt * 1000).toDateString()}</td>`);
            $(this).append(`<img src="https://openweathermap.org/img/wn/${mode(OneDayIcon)}.png" aria-label="icon">`);
            $(this).append(`<td>${Math.round(Math.max(...OneDayMax))}/${Math.round(Math.min(...OneDayMin))}&deg;C</td>`);
            $(this).append(`<td>${mode(OneDay)}</td>`);
            $(this).append(`<td><i class="fa-solid fa-droplet fa-sm"></i>&ensp;${Math.round(average(OneDayPop) * 10) * 10}%</td>`);
            i++;
        });
    }
});