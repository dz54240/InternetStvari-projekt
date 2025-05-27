# frozen_string_literal: true

class MoistureMeasurementSerializer
  include JSONAPI::Serializer

  set_type :moisture_measurement
  set_id :id

  attribute :value
  attribute :created_at
  attribute :updated_at
end
