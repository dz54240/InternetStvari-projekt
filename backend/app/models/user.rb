# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string
#  email           :string           not null
#  password_digest :string
#  token           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  has_secure_token

  has_many :greenhouses, dependent: :destroy

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates_email_format_of :email, message: 'is invalid'
  validates :first_name, presence: true

  default_scope { order(email: :asc) }
end
