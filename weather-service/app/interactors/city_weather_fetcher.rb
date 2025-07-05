# Frozen_string_literal: true

class CityWeatherFetcher
  CACHE_EXPIRATION = 1.hour

  def self.call(city)
    cities = ExternalCitiesService.fetch_cities(city_name: city)
    return [] if cities.blank?

    filtered_cities = cities.select { |c| c[:result_type] == 'city' }
    return [] if filtered_cities.empty?

    filtered_cities.map do |city_data|
      weather = fetch_or_cache_weather(city_data)
      city_data.merge(weather: weather)
    end
  end

  private

  def self.fetch_or_cache_weather(city_data)
    weather_cache_key = "weather:#{city_data[:data_id]}:#{city_data[:state_code]}:#{city_data[:country_code]}"
    cached_weather = CacheRepository.get(weather_cache_key)
    return cached_weather if cached_weather

    weather = ExternalWeatherService.fetch_weather(
      city_data[:city_name],
      city_data[:latitude],
      city_data[:longitude]
    )

    CacheRepository.set(weather_cache_key, weather, CACHE_EXPIRATION) if weather

    weather
  end
end
