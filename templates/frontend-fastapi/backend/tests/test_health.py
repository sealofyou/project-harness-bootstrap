from app.services.health_service import build_health_payload


def test_health_payload_returns_ok_status():
    payload = build_health_payload()

    assert payload == {"status": "ok"}
