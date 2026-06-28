"""Application configuration, loaded from environment / .env file."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Database
    database_url: str = "mysql+pymysql://arai_app:password@127.0.0.1:3306/arai_lab?charset=utf8mb4"

    # JWT auth
    jwt_secret: str = "dev-insecure-secret-change-me"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 720  # 12 hours

    # Initial admin (used to bootstrap the first account if none exists)
    admin_username: str = "admin"
    admin_password: str = "admin"

    # CORS: comma separated origins, or "*"
    cors_origins: str = "*"

    @property
    def cors_origin_list(self) -> list[str]:
        value = (self.cors_origins or "").strip()
        if value == "*" or value == "":
            return ["*"]
        return [o.strip() for o in value.split(",") if o.strip()]


settings = Settings()
