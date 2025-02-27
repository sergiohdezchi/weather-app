# frozen_string_literal: true

class CityMapper
  def self.map(city_data)
    {
      city_name: city_data['city_name'],
      city_slug: city_data['city_slug'],
      state: normalize_name(city_data['state']),
      country: normalize_name(city_data['country']),
      latitude: city_data['lat'],
      longitude: city_data['long'],
      result_type: city_data['result_type'],
      popularity: city_data['popularity']
    }
  end

  def self.normalize_name(name)
    name&.downcase&.tr(' ', '_')
  end
end
