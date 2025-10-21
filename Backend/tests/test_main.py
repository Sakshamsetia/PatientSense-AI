from fastapi.testclient import TestClient
import importlib.util
import sys
from pathlib import Path

# Load main.py as a module regardless of sys.path
main_path = Path(__file__).resolve().parents[1] / 'main.py'
spec = importlib.util.spec_from_file_location('ps_main', str(main_path))
main_mod = importlib.util.module_from_spec(spec)
sys.modules['ps_main'] = main_mod
spec.loader.exec_module(main_mod)

client = TestClient(main_mod.app)


def test_root():
    res = client.get('/')
    assert res.status_code == 200
    assert 'message' in res.json()


def test_get_alerts():
    res = client.get('/api/v1/alerts')
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)


def test_patient_summary():
    res = client.get('/api/v1/patients/101/summary')
    assert res.status_code == 200
    data = res.json()
    assert data.get('patient_id') == 101
    assert 'summary' in data
