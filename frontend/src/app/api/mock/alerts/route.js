export async function GET() {
  const alerts = [
    { id: 1, patient_id: 101, message: 'High heart rate detected.', level: 'Warning' },
    { id: 2, patient_id: 102, message: 'Visual distress signal.', level: 'Critical' },
    { id: 3, patient_id: 103, message: 'Patient requested assistance.', level: 'Info' },
  ];

  return new Response(JSON.stringify(alerts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
