# == Schema Information
#
# Table name: greenhouses
#
#  id                     :bigint           not null, primary key
#  name                   :string           not null
#  irrigation             :boolean
#  windows                :boolean
#  window_open_percentage :float
#  lighting               :boolean
#  user_id                :bigint           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class Greenhouse < ApplicationRecord
  belongs_to :user
  has_many :moisture_measurements, dependent: :destroy
  has_many :temperature_measurements, dependent: :destroy

  validates :name, presence: true
end
