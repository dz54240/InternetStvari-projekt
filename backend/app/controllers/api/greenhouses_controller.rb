# frozen_string_literal: true

module Api
  class GreenhousesController < ApplicationController
    before_action :authenticate_user, except: [:measurments]
    # before_action :verify_iot_host, only: [:measurments]
    before_action :preload_resource, only: [:show, :update, :destroy, :measurments]
    before_action :create_resource, only: [:create]

    def index
      render_json(policy_scope(Greenhouse))
    end

    def show
      render_json(@resource)
    end

    def create
      save_record(create_params)
    end

    def update
      save_record(update_params)
    end

    def destroy
      @resource.destroy

      head :no_content
    end

    def measurments
      if measurments_creator.create_measurments
        head :ok
      else
        render json: { error: 'Failed to create measurments' }, status: :unprocessable_entity
      end
    end
    

    private

    def saver(params)
      @saver ||= Base::GreenhouseSaver.new(@resource || @new_resource, params, current_user)
    end

    def measurments_creator
      @measurments_creator ||= Base::MeasurmentsCreator.new(@resource, permitted_params_for_measurments_create, current_user)
    end

    def permitted_params_for_measurments_create
      params.require(:data).permit(policy(@resource).permitted_attributes_for_measurments_create)
    end

    # def verify_iot_host
    #   true
    #   allowed_hosts = ['iot.mojadomena.hr']
    #   unless allowed_hosts.include?(request.host)
    #     render json: { error: 'Forbidden: Invalid source host' }, status: :forbidden
    #   end
    # end
  end
end
