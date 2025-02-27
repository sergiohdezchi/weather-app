# Frozen_string_literal: true

require 'httparty'

class ExternalWeatherService
  API_URL = 'https://api.openweathermap.org/data/2.5/weather'
  FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast'

  def self.fetch_weather(city, latitude, longitude)
    url = "#{API_URL}?lat=#{latitude}&lon=#{longitude}&appid=#{ENV['OPENWEATHER_API_KEY']}"
    response = HTTParty.get(url)

    return nil unless response.success?

    parsed_response = response.parsed_response
    ::WeatherMapper.map(
      city:,
      parsed_response:
    )
  end

  def self.fetch_forecast(latitude, longitude)
    url = "#{FORECAST_API_URL}?lat=#{latitude}&lon=#{longitude}&cnt=#{ENV['FORECAST_CNT']}&appid=#{ENV['OPENWEATHER_API_KEY']}"
    response = HTTParty.get(url)

    return nil unless response.success?

    parsed_response = response.parsed_response
    parsed_response['list'].map { |day| ::ForecastMapper.map(day) }
  end
end
