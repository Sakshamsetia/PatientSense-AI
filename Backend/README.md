# Backend (PatientSense AI)

This folder contains a small FastAPI placeholder API for PatientSense AI.

Quick start (Windows cmd):

```cmd
cd "c:\Users\Saksham Setia\OneDrive\Desktop\InterIIT Prep\Projects\PatientSense-AI\Backend"
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

API endpoints (placeholder):
- GET / — welcome
- POST /api/v1/analyze — receives multimodal data, returns a dummy AnalysisReport
- GET /api/v1/patients/{patient_id}/summary — returns a dummy empathetic summary
- GET /api/v1/alerts — returns sample alerts
