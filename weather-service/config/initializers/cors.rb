Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*',
      headers: :any,
      expose: [ "Authorization" ], # Si devuelves tokens en la cabecera
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
