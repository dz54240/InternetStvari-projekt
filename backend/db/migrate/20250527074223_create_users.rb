class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name
      t.string :email, null: false, index: { unique: true }
      t.string :password_digest
      t.string :token, index: { unique: true }
      t.timestamps
    end
  end
end
