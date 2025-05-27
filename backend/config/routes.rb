Rails.application.routes.draw do
  namespace :api do
    resource :sessions, only: [:create, :destroy]

    resources :users, except: [:new, :edit]

    resources :greenhouses, except: [:new, :edit] do
      member do
        post :measurments
      end
    end

    resources :temperature_measurements, only: [:index, :show]

    resources :moisture_measurements, only: [:index, :show]
  end
end
