 'use client';
import React from 'react';
import AlertsPanel from './AlertsPanel';
import AiReport from './AiReport';
import VitalsMonitor from './VitalsMonitor';
import AnalyzeForm from './AnalyzeForm';

// Lazy load Plotly chart to ensure it's client-side
import dynamic from 'next/dynamic';
const EmotionChart = dynamic(() => import('./EmotionChart'), {
  ssr: false, // This is crucial for Plotly
});

export default function HealthDashboard() {
  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="chart-grid">
          <EmotionChart />
          <VitalsMonitor />
        </div>
  <AiReport />
  <AnalyzeForm />
      </div>
      <div className="sidebar">
        <AlertsPanel />
      </div>
    </div>
  );
}
