'use client';
import React, { useState } from 'react';

export default function AnalyzeForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const submitDummy = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    const payload = {
      patient_id: 101,
      vision_data: { emotion: 'calm' },
      audio_data: { transcript: 'no pain' },
      sensor_data: [ { hr: 88, spo2: 98 } ]
    };

    try {
      const res = await fetch(`${base}/api/v1/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      // fallback to local mock API
      try {
        const r2 = await fetch('/api/mock/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (r2.ok) {
          const data2 = await r2.json();
          setResult(data2);
        } else {
          throw new Error(`Mock HTTP ${r2.status}`);
        }
      } catch (err2) {
        setError(err2.message || String(err2));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Send Demo Analyze Request</h3>
      <p>Send a dummy multimodal payload to the backend analyze endpoint.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={submitDummy} disabled={loading}>
          {loading ? 'Sending...' : 'Send Demo Analyze'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result && (
        <div style={{ marginTop: 12 }}>
          <strong>Result:</strong>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
