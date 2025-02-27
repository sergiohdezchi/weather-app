# frozen_string_literal: true

class ApiController < ApplicationController
  before_action :doorkeeper_authorize!

  respond_to :json

  def current_user
    @current_user ||= User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end
end
