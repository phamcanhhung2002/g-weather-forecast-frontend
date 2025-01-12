function getApiBaseUrl() {
  return "http://localhost:3000/api/v1";
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
