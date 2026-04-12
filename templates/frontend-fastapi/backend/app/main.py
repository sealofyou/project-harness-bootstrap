from time import perf_counter

from fastapi import FastAPI, Request

from app.api.routes.health import router as health_router
from app.core.config import settings
from app.core.logging import configure_logging, get_logger

configure_logging()
logger = get_logger(__name__)

app = FastAPI(title=settings.app_name)
app.include_router(health_router, prefix=settings.api_prefix)


@app.on_event("startup")
async def on_startup() -> None:
    logger.info("application startup complete")


@app.middleware("http")
async def log_requests(request: Request, call_next):
    started_at = perf_counter()
    logger.info("request started method=%s path=%s", request.method, request.url.path)

    try:
        response = await call_next(request)
    except Exception:
        logger.exception("request failed method=%s path=%s", request.method, request.url.path)
        raise

    duration_ms = (perf_counter() - started_at) * 1000
    logger.info(
        "request finished method=%s path=%s status=%s duration_ms=%.2f",
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
    )
    return response
