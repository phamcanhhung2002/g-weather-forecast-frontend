function formatDate(timestampInSeconds) {
  const date = new Date(timestampInSeconds * 1000);
  return date.toLocaleDateString().split("/").join("-");
}

function formatWind(windInKPH) {
  return parseFloat((windInKPH * 5) / 18).toFixed(2);
}

function setCurrentWeather(current, location) {
  const { localtime_epoch, name } = location;

  const cityAndDate = document.getElementById("city-and-date");
  const formatDateString = formatDate(localtime_epoch);

  cityAndDate.innerHTML = `${name}(${formatDateString})`;

  const { temp_c, wind_kph, humidity, condition } = current;

  const temp = document.getElementById("temperature");
  temp.innerHTML = temp_c;

  const wind = document.getElementById("wind");
  wind.innerHTML = formatWind(wind_kph);

  const humid = document.getElementById("humid");
  humid.innerHTML = humidity;

  const conditionIcon = document.getElementById("condition-icon");
  const { icon, text } = condition;

  conditionIcon.src = icon;
  conditionIcon.alt = text;

  const conditionText = document.getElementById("condition");
  conditionText.innerHTML = text;
}

function parseHTML(html) {
  const t = document.createElement("template");
  t.innerHTML = html;
  return t.content;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getForecastDateMarkdown(forecastdate) {
  const { date_epoch, day } = forecastdate;
  const { avgtemp_c, maxwind_kph, avghumidity, condition } = day;
  const { icon, text } = condition;

  return `<div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div class="bg-secondary rounded-1 p-3">
              <p class="fw-bold">(${formatDate(date_epoch)})</p>
              <img
                src="${icon}"
                alt="${text}"
                width="50px"
                height="50px"
              />
              <p>Temp: ${avgtemp_c}&deg;C</p>
              <p>Wind: ${formatWind(maxwind_kph)}&nbsp;M/S</p>
              <p>Humidity: ${avghumidity}%</p>
            </div>
          </div>`;
}

function setForecastWeather(forecast, q) {
  const { forecastday } = forecast;
  const forecastNode = document.getElementById("forecast");

  removeAllChildNodes(forecastNode);

  for (const forecastdate of forecastday) {
    const forecastDateNode = parseHTML(getForecastDateMarkdown(forecastdate));
    forecastNode.appendChild(forecastDateNode);
  }

  const numForecastDates = document.getElementById("num-forecast-dates");
  numForecastDates.innerHTML = forecastday.length;

  const oldAddMoreBtn = document.getElementById("load-more-btn");

  if (oldAddMoreBtn) {
    oldAddMoreBtn.remove();
  }

  let newNumOfForecastDates = forecastday.length + 4;

  if (newNumOfForecastDates === 14) {
    return;
  } else if (newNumOfForecastDates === 12) {
    newNumOfForecastDates = 10;
  }

  const addMoreBtn = parseHTML(
    `<div class="d-flex justify-content-end"><button type="button" class="btn btn-outline-secondary mt-3" onclick="getWeather(${newNumOfForecastDates}, 'load-more-btn', '${q}')" id="load-more-btn">
    <span class="spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading More</span></button></div>`
  );

  forecastNode.after(addMoreBtn);
}

function setData(data, q) {
  const { current, forecast, location } = data;

  setCurrentWeather(current, location);
  setForecastWeather(forecast, q);
}

function getWeatherForecast(days, btnId) {
  const q = document.getElementById("q").value;

  getWeather(days, btnId, q);
}

function getWeather(days, btnId, q) {
  const weatherUrl = getWeatherForecastUrl();
  openLoading(btnId);

  fetch(`${weatherUrl}?days=${days}&q=${q}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      const status = response.status;
      const data = await response.json();
      switch (status) {
        case 200:
          setData(data, q);
          break;
        case 400:
          setToastMessage(data?.message ?? "You should input your city name!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => hideLoading(btnId));
}

function getWeatherByLocation(days, btnId) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const { latitude, longitude } = coords;

      const q = `${latitude},${longitude}`;
      getWeather(days, btnId, q);
    });
  } else {
    setToastMessage("You should allow us to get your current location!");
  }
}
