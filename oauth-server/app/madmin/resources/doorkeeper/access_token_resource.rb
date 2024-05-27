class Doorkeeper::AccessTokenResource < Madmin::Resource
  # Attributes
  attribute :id, form: false
  attribute :resource_owner_id
  attribute :token
  attribute :refresh_token
  attribute :expires_in
  attribute :scopes
  attribute :created_at, form: false
  attribute :revoked_at
  attribute :previous_refresh_token

  # Associations
  attribute :application

  # Uncomment this to customize the display name of records in the admin area.
  # def self.display_name(record)
  #   record.name
  # end

  # Uncomment this to customize the default sort column and direction.
  # def self.default_sort_column
  #   "created_at"
  # end
  #
  # def self.default_sort_direction
  #   "desc"
  # end
end
