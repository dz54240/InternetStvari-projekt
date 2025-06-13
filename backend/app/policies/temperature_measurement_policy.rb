class TemperatureMeasurementPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    user_is_owner_of_greenhouse?
  end

  def create?
    false
  end

  def update?
    false
  end

  def destroy?
    false
  end

  def permitted_attributes_for_create
    permitted_attributes
  end

  def permitted_attributes_for_update
    permitted_attributes
  end

  class Scope < Scope
    def resolve
      scope.where(greenhouse_id: user.greenhouses.pluck(:id))
    end
  end

  private

  def permitted_attributes
    []
  end

  def user_is_owner_of_greenhouse?
    record.greenhouse.user_id == user.id
  end
end
