class CreateMoistureMeasurements < ActiveRecord::Migration[7.1]
  def change
    create_table :moisture_measurements do |t|
      t.float :value
      t.belongs_to :greenhouse, null: false, foreign_key: true, index: true
      t.timestamps
    end
  end
end
