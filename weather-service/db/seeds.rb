
if Doorkeeper::Application.count == 0
  Doorkeeper::Application.create!(
    name: 'React App',
    uid: 'Q8dKTGKhgXfr-t8F-a6dSzOGtXqcvu6YlzT_b2BB23I',
    secret: 'CSkzwaRzNxs7uc0-zU_xWHeCaRQvNmSd5ubTAkM3ZqM',
    redirect_uri: '',
    confidential: true,
    scopes: ''
  )
end

User.first_or_create(
  email: 'admin@example.com',
  password: '123456ab',
  password_confirmation: '123456ab'
)
