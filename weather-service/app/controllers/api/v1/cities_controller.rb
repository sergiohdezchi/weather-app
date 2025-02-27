# Frozen_string_literal: true

module Api
  module V1
    class CitiesController < ApiController
      def index
        cities = CityWeatherFetcher.call(city_params[:city])

        paginated_cities = Kaminari.paginate_array(cities).page(params[:page]).per(params[:per_page])

        if paginated_cities
          render json: {
            cities: paginated_cities.map { |city| ::CitySerializer.serialize(city) },
            total_pages: paginated_cities.total_pages,
            current_page: paginated_cities.current_page,
            total_count: paginated_cities.total_count
          }, status: :ok
        else
          render json: { error: 'Could not fetch cities data' }, status: :unprocessable_entity
        end
      end

      private

      def city_params
        params.permit(:city)
      end
    end
  end
end
