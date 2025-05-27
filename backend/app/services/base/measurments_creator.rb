module Base
  class MeasurmentsCreator
    def initialize(resource, params, current_user)
      @resource = resource
      @params = params
      @current_user = current_user
    end

    def create_measurments
      @resource.update(updated_at: Time.now)
      update_greenhouse && create_temperature_measurement && create_moisture_measurement
    end

    private
    
    def update_greenhouse
      @resource.update(
        irrigation: irrigation_param || @resource.irrigation,
        windows: windows_param || @resource.windows,
        window_open_percentage: window_open_percentage_param || @resource.window_open_percentage,
        lighting: lighting_param || @resource.lighting
      )
    end

    def create_temperature_measurement
      return unless temperature_param

      @resource.temperature_measurements.create(
        value: temperature_param,
        greenhouse_id: @resource.id
      )
    end

    def create_moisture_measurement
      return unless moisture_param

      @resource.moisture_measurements.create(
        value: moisture_param,
        greenhouse_id: @resource.id
      )
    end

    def temperature_param
      @params[:temperature]
    end

    def moisture_param
      @params[:moisture]
    end

    def lighting_param
      @params[:lighting]
    end

    def windows_param
      @params[:windows]
    end

    def irrigation_param
      @params[:irrigation]
    end

    def window_open_percentage_param
      @params[:window_open_percentage]
    end
  end
end