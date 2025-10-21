export async function GET(request, { params }) {
  const id = params.id || 101;
  const summary = `This is a local mock empathetic report for patient ${id}. Vitals are stable. (Mock)`;

  return new Response(JSON.stringify({ patient_id: Number(id), summary }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
