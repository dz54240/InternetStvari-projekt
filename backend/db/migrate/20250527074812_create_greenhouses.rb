class CreateGreenhouses < ActiveRecord::Migration[7.1]
  def change
    create_table :greenhouses do |t|
      t.string :name, null: false
      t.boolean :irrigation
      t.boolean :windows
      t.float :window_open_percentage
      t.boolean :lighting
      t.belongs_to :user, null: false, foreign_key: true, index: true
      t.timestamps
    end
  end
end
