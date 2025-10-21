export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const patient_id = body.patient_id || 101;
  const vision = (body.vision_data && body.vision_data.emotion) || 'calm';

  const fused_state = vision === 'distress' ? 'Agitated' : 'Calm';
  const active_alert = fused_state === 'Agitated';
  const summary = `Mock analysis for patient ${patient_id}. Fused state: ${fused_state}`;

  const resp = { patient_id, fused_state, summary, active_alert };

  return new Response(JSON.stringify(resp), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
