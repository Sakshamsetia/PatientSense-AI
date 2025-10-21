'use client';
import React from 'react';

const vitals = {
  heartRate: '88 bpm',
  spO2: '98%',
  emotion: 'Calm',
};

export default function VitalsMonitor() {
  return (
    <div className="card">
      <h3>Current Vitals</h3>
      <div className="vitals-grid">
        <div>
          <h4>Heart Rate</h4>
          <p>{vitals.heartRate}</p>
        </div>
        <div>
          <h4>SpO2</h4>
          <p>{vitals.spO2}</p>
        </div>
        <div>
          <h4>Detected Emotion</h4>
          <p>{vitals.emotion}</p>
        </div>
      </div>
    </div>
  );
}
