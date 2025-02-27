
if Doorkeeper::Application.count == 0
  Doorkeeper::Application.create!(
    name: 'React App',
    redirect_uri: '',
    scopes: ''
  )
end

User.first_or_create(
  email: 'admin@example.com',
  password: '123456ab',
  password_confirmation: '123456ab'
)
