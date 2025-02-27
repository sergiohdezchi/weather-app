# Frozen_string_literal: true

class ForecastMapper
  def self.map(day)
    return nil unless day

    {
      date: Time.at(day['dt']).to_date,
      min_temp: day['main']['temp_min'],
      max_temp: day['main']['temp_max'],
      weather: day['weather'][0]['main'],
      weather_description: day['weather'][0]['description']
    }
  end
end
