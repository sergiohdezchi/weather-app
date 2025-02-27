# Frozen_string_literal: true

class ForecastSerializer
  def self.serialize(forecast)
    {
      date: forecast['date'],
      min_temp: forecast['min_temp'],
      max_temp: forecast['max_temp'],
      weather: forecast['weather'],
      weather_description: forecast['weather_description']
    }
  end
end
