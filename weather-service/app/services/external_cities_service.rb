# frozen_string_literal: true

require 'httparty'

class ExternalCitiesService
  API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'
  API_HOST = 'wft-geo-db.p.rapidapi.com'

  def self.fetch_cities(city_name:)
    response = HTTParty.get(API_URL, {
      query: { namePrefix: city_name },
      headers: {
        'X-RapidAPI-Key' => ENV['RAPIDAPI_KEY'],
        'X-RapidAPI-Host' => API_HOST
      }
    })

    sleep(1)

    return nil unless response.success?

    cities = response.parsed_response['data'] || []

    cities.map { |city| ::CityMapper.map(city) }
  end
end
