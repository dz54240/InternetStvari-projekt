# frozen_string_literal: true

module Api
  class MoistureMeasurementsController < ApplicationController
    before_action :authenticate_user
    before_action :preload_resource, only: [:show]

    def index
      render_json(scope)
    end

    def show
      render_json(@resource)
    end

    private

    def scope
      return basic_scope if greenhouse_filter.blank?

      basic_scope.where(greenhouse_id: greenhouse_filter[:greenhouse_id])
    end

    def basic_scope
      policy_scope(MoistureMeasurement)
    end

    def greenhouse_filter
      params.permit(:greenhouse_id)
    end
  end
end
