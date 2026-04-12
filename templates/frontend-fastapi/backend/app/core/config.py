from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    app_name: str = "__PROJECT_NAME__"
    api_prefix: str = "/api"


settings = Settings()
