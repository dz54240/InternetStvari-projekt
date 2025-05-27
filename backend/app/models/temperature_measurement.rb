# == Schema Information
#
# Table name: temperature_measurements
#
#  id            :bigint           not null, primary key
#  value         :float
#  greenhouse_id :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class TemperatureMeasurement < ApplicationRecord
  belongs_to :greenhouse
end
