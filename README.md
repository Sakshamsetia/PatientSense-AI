# PatientSense AI

**Empathetic AI for health monitoring through vision, audio, and sensor data** 

---

PatientSense AI is a multimodal system designed to provide a holistic understanding of a patient's well-being. By integrating visual, auditory, and biosensor data, the system recognizes distress, predicts deterioration, and communicates empathetically with caregivers, moving beyond simple physiological signals to include emotional and behavioral indicators.

## Table of Contents

- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Future Plans](#future-plans)
- [Meet the Team](#meet-the-team)

## The Problem

Despite rapid advances in AI, current patient monitoring solutions lack a holistic understanding of a patient's state[cite: 6].They excel at processing physiological signals but largely ignore the crucial emotional and behavioral indicators that often precede a health event. This gap prevents truly proactive and empathetic healthcare responses.

## Our Solution

PatientSense AI bridges this gap by fusing three data streams into a unified system that continuously monitors the emotional and mental health of patients.

Our system is better than existing solutions because it:
* **Reduces False Alarms:** Cross-verifies data from audio, video, and sensors to improve accuracy, unlike systems that rely on a single metric.
* **Improves Automation:** Provides 24/7 monitoring of audio and visual cues to detect unease without requiring the constant presence of a nurse.
* **Provides Context, Not Just Data:** Generates direct, actionable reports for analysis, rather than a long list of raw numbers that doctors must manually interpret.

## Key Features

* **Multimodal Analysis:** Fuses vision (Facial Emotion Recognition), audio (speech analysis), and sensor data for holistic emotion and distress detection.
* **Empathetic Intelligence:** Generates natural-language summaries for caregivers and can provide calming responses.
* **Interactive Dashboard:** Displays real-time vitals, tracks emotion trends, and sends smart alerts to caregivers.

## Architecture

The system processes data through three parallel pipelines that are fused for a final, unified analysis:

1.  **Vision Pipeline:**
    * **Input:** [Camera Feed] 
    * **Encoder:** Vision Encoder (FER + ViT)

2.  **Audio Pipeline:**
    * **Input:** [Mic Audio] 
    * **Encoder:** Audio Encoder (Whisper + CNN-LSTM) 

3.  **Sensor Pipeline:**
    * **Input:** [Biosensor Sensor Stream]
    * **Analyzer:** LSTM-based Sensor Analyzer

These inputs are fed into a **Multimodal Fusion Transformer**, which outputs its findings to the **Health Dashboard + Alerts + Empathetic AI Report**.

## Tech Stack

| Component | Technologies Used |
| :--- | :--- |
| **Website** | **Frontend:** ReactJs, Plotly <br> **Backend:** FastAPI <br> **Database:** SupaBase  |
| **Visual Module** | OpenCV, PyTorch, HuggingFace Transformers, MediaPipe, Vision Transformers  |
| **Audio Module** | PyTorch Audio, Librosa, HuggingFace Transformers, OpenAI Whisper, CNN-LSTM  |
| **BioSensors Module** | Samsung Healthcare API SDK, LSTM, Numpy, Pandas, Pytorch  |
| **Summarization** | HuggingFace Transformers, Gemini Api key, Langchain |

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

* Python 3.9+
* Node.js & npm
* SupaBase Account [cite: 31]
* Gemini API Key [cite: 38]

### 1. Backend (FastAPI)

```bash
# Navigate to the backend directory
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Create a .env file and add your API keys (SupaBase, Gemini)
# Example:
# SUPABASE_URL="your_url"
# SUPABASE_KEY="your_key"
# GEMINI_API_KEY="your_key"

# Run the server
uvicorn main:app --reload
```
### FrontEnd(NextJs)
```
# Navigate to the frontend directory
cd frontend

# Install npm packages
npm install

# Run the development server
npm start
```

The application should now be accessible at http://localhost:3000.
## Future Plans

Our goal is to convert this project into a full-fledged MedTech Startup. Our plan of action includes:
* Launching a clinical pilot study with a partner hospital to validate model accuracy with real-world patient data.
* Integrating with hospital EHR systems (via FHIR/HL7) and deploying on edge devices for privacy and real-time processing.
* Specializing the platform for a high-value niche, such as remote neurology (Parkinson's) or telehealth pre-assessment.

## Meet the Team

* SAKSHAM SETIA 
* SACHIT BANSAL 
* RIDDHI MAHESHWARI 
* ARYAN GARG
* SHIWANG KHERA