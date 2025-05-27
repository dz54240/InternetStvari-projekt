# frozen_string_literal: true

module Base
  class GreenhouseSaver < Base::BaseSaver
    def save
      set_user_id

      super
    end

    private

    def set_user_id
      record.user_id = current_user.id
    end
  end
end
