# Frozen_string_literal: true

class WeatherMapper
  def self.map(city:, parsed_response:)
    return nil unless parsed_response

    {
      city: city,
      temp: parsed_response['main']['temp'],
      weather: parsed_response['weather'][0]['main'],
      weather_description: parsed_response['weather'][0]['description']
    }
  end
end
