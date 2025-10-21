'use client';
import React from 'react';
import Plot from 'react-plotly.js';

// Plotly needs to run client-side, so we must wrap it
// or lazy-load it. For this dummy, we'll just make the
// component a client component.

// Dummy data
const data = [
  {
    x: ['1:00', '2:00', '3:00', '4:00', '5:00'],
    y: [10, 5, 20, 15, 25],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Distress Level',
    line: { color: '#e74c3c' },
  },
];

export default function EmotionChart() {
  return (
    <div className="card">
      <h3>Emotion & Distress Trends</h3>
      <Plot
        data={data}
        layout={{
          title: 'Real-time Patient Emotion',
          autosize: true,
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
