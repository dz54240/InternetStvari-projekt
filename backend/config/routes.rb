Rails.application.routes.draw do
  namespace :api do
    resource :sessions, only: [:create, :destroy]

    resources :users, except: [:new, :edit]

    resources :greenhouses, except: [:new, :edit] do
      member do
        post :measurments
      end
    end
  end
end
