'use client'; // This component will fetch data
import React, { useEffect, useState } from 'react';

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    fetch(`${base}/api/v1/alerts`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setAlerts(data))
      .catch(() => {
        // fallback to local mock API route inside Next.js
        return fetch(`/api/mock/alerts`).then(r => r.json()).then(data => setAlerts(data));
      })
      .catch(err => setError(err.message || 'Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h3>Smart Alerts</h3>
      {loading && <p>Loading alerts...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {alerts.map(alert => (
            <li key={alert.id} className={`alert-${(alert.level || '').toLowerCase()}`}>
              <strong>{alert.level}:</strong> {alert.message || alert.msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
