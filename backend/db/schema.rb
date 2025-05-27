# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_05_27_075520) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "greenhouses", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "irrigation"
    t.boolean "windows"
    t.float "window_open_percentage"
    t.boolean "lighting"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_greenhouses_on_user_id"
  end

  create_table "moisture_measurements", force: :cascade do |t|
    t.float "value"
    t.bigint "greenhouse_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["greenhouse_id"], name: "index_moisture_measurements_on_greenhouse_id"
  end

  create_table "temperature_measurements", force: :cascade do |t|
    t.float "value"
    t.bigint "greenhouse_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["greenhouse_id"], name: "index_temperature_measurements_on_greenhouse_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name"
    t.string "email", null: false
    t.string "password_digest"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["token"], name: "index_users_on_token", unique: true
  end

  add_foreign_key "greenhouses", "users"
  add_foreign_key "moisture_measurements", "greenhouses"
  add_foreign_key "temperature_measurements", "greenhouses"
end
