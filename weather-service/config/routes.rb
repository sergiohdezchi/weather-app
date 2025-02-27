Rails.application.routes.draw do
  use_doorkeeper
  devise_for :users
  get "up" => "rails/health#show", as: :rails_health_check
  draw :api
end
