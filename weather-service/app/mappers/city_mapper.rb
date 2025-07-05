# frozen_string_literal: true

class CityMapper
  def self.map(city_data)
    {
      city_name: city_data['city'],
      city_slug: city_data['city'].parameterize,
      data_id: city_data['wikiDataId'],
      state: normalize_name(city_data['region']),
      state_code: city_data['countryCode'],
      country: normalize_name(city_data['country']),
      country_code: city_data['countryCode'],
      latitude: city_data['latitude'],
      longitude: city_data['longitude'],
      result_type: city_data['type'].downcase,
      popularity: city_data['population']
    }
  end

  def self.normalize_name(name)
    name.to_s.strip.titleize
  end
end
