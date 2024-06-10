function getApiBaseUrl() {
  return "https://g-weather-forecast-backend.onrender.com/api";
}

function getWeatherForecastUrl() {
  return getApiBaseUrl() + "/weather";
}

function getSubscriptionUrl() {
  return getApiBaseUrl() + "/subscribe/email";
}

function getUnsubscriptionUrl() {
  return getApiBaseUrl() + "/unsubscribe";
}
