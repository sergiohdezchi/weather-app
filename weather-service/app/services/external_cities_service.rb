# frozen_string_literal: true

require 'httparty'

class ExternalCitiesService
  API_URL = 'https://search.reservamos.mx/api/v2/places'

  def self.fetch_cities(city_name:)
    response = HTTParty.get("#{API_URL}?q=#{city_name}")

    return nil unless response.success?

    response.parsed_response.map { |city| ::CityMapper.map(city) }
  end
end
