# frozen_string_literal: true

namespace :api do
  namespace :v1 do
    resources :cities, only: [ :index ]
    resource :weather_forecasts, only: [ :show ]
  end
end

scope :api do
  scope :v1 do
     use_doorkeeper do
      skip_controllers :authorizations, :applications, :authorized_applications
     end
  end
end
