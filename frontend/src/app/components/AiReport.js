'use client'; // This component will fetch data
import React, { useEffect, useState } from 'react';

const fallbackPatientId = 101;

export default function AiReport() {
  const [report, setReport] = useState('Loading report...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    fetch(`${base}/api/v1/patients/${fallbackPatientId}/summary`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setReport(data.summary || JSON.stringify(data)))
      .catch(() => {
        return fetch(`/api/mock/patients/${fallbackPatientId}`).then(r => r.json()).then(data => setReport(data.summary));
      })
      .catch(err => setError(err.message || 'Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h3>Empathetic AI Report (Last 8 Hours)</h3>
      {loading && <p>Loading report...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && <p>{report}</p>}
    </div>
  );
}
