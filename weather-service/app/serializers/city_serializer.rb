# Frozen_string_literal: true

class CitySerializer
  def self.serialize(city)
    city = city.deep_symbolize_keys
    {
      city_name: city[:city_name],
      city_slug: city[:city_slug],
      state: city[:state],
      country: city[:country],
      latitude: city[:latitude],
      longitude: city[:longitude],
      result_type: city[:result_type],
      popularity: city[:popularity],
      weather: {
        city: city.dig(:weather, :city),
        temp: city.dig(:weather, :temp),
        weather: city.dig(:weather, :weather),
        weather_description: city.dig(:weather, :weather_description)
      }
    }
  end
end
