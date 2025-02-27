# Frozen_string_literal: true

module Api
  module V1
    class WeatherForecastsController < ApiController
      def show
        latitude = forecast_params[:latitude]
        longitude = params[:longitude]
        city = params[:city]
        state = params[:state]
        country = params[:country]

        forecast_data = ForecastFetcher.call(latitude:, longitude:, city:, state:, country:)

        paginated_forecast = Kaminari.paginate_array(forecast_data).page(params[:page]).per(params[:per_page])

        if paginated_forecast
          render json: {
            forecast: paginated_forecast.map { |forecast| ::ForecastSerializer.serialize(forecast) },
            total_pages: paginated_forecast.total_pages,
            current_page: paginated_forecast.current_page,
            total_count: paginated_forecast.total_count
          }, status: :ok
        else
          render json: { error: 'Unable to fetch forecast data' }, status: :service_unavailable
        end
      end

      private

      def forecast_params
        params.permit(:latitude, :longitude, :city, :state, :country)
      end
    end
  end
end
