from app.core.logging import get_logger

logger = get_logger(__name__)


def build_health_payload() -> dict:
    # Keep the sample service tiny but visible for later extension.
    logger.info("health_check service executed")
    return {"status": "ok"}
