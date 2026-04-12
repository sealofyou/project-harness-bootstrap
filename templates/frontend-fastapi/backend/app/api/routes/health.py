from fastapi import APIRouter

from app.services.health_service import build_health_payload

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
def get_health() -> dict:
    return build_health_payload()
