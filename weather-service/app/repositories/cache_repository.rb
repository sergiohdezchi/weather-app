# Frozen_string_literal: true

class CacheRepository
  REDIS = Redis.new(url: ENV.fetch('REDIS_URL', 'redis://localhost:6379/0'))

  def self.get(key)
    value = REDIS.get(key)
    value ? JSON.parse(value) : nil
  end

  def self.set(key, value, expires_in = 1.hour)
    REDIS.set(key, value.to_json, ex: expires_in.to_i)
  end
end
