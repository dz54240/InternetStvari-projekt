# == Schema Information
#
# Table name: moisture_measurements
#
#  id            :bigint           not null, primary key
#  value         :float
#  greenhouse_id :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class MoistureMeasurement < ApplicationRecord
  belongs_to :greenhouse
end
