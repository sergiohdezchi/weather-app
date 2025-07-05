# frozen_string_literal: true

class ForecastFetcher
  def self.call(city:, state:, country:, latitude:, longitude:)
    cache_key = "forecast:#{latitude}:#{longitude}"
    cached_forecast = CacheRepository.get(cache_key)

    return cached_forecast if cached_forecast

    forecast = ExternalWeatherService.fetch_forecast(latitude, longitude)
    CacheRepository.set(cache_key, forecast, 24.hours) if forecast

    forecast
  end
end
