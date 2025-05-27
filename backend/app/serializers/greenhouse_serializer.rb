# frozen_string_literal: true

class GreenhouseSerializer
  include JSONAPI::Serializer

  set_type :greenhouse
  set_id :id

  attribute :name
  attribute :user_id
  attribute :irrigation
  attribute :windows
  attribute :window_open_percentage
  attribute :lighting
  attribute :last_temperature_measurement
  attribute :last_moisture_measurement
  attribute :created_at
  attribute :updated_at
end
