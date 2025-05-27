# frozen_string_literal: true

class TemperatureMeasurementSerializer
  include JSONAPI::Serializer

  set_type :temperature_measurement
  set_id :id

  attribute :value
  attribute :created_at
  attribute :updated_at
end
