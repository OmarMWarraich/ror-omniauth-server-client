# Below are the routes for madmin
namespace :madmin do
  namespace :active_storage do
    resources :attachments
  end
  namespace :active_storage do
    resources :blobs
  end
  resources :announcements
  resources :services
  namespace :noticed do
    resources :events
  end
  namespace :noticed do
    resources :notifications
  end
  namespace :active_storage do
    resources :variant_records
  end
  namespace :doorkeeper do
    resources :access_grants
  end
  namespace :doorkeeper do
    resources :access_tokens
  end
  resources :users
  root to: "dashboard#show"
end
