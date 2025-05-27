# frozen_string_literal: true

class GreenhousePolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    user_is_owner?
  end

  def create?
    true
  end

  def update?
    user_is_owner?
  end

  def destroy?
    user_is_owner?
  end

  def permitted_attributes_for_create
    permitted_attributes
  end

  def permitted_attributes_for_update
    permitted_attributes
  end

  class Scope < Scope
    def resolve
      scope.where(user_id: user.id)
    end
  end

  private

  def permitted_attributes
    [:name]
  end

  def user_is_owner?
    record.user_id == user.id
  end
end
