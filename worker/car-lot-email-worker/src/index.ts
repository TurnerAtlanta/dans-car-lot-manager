export default {
  async fetch(request, env) {
    if (request.method !== 'POST' || !request.url.includes('/api/send-email')) {
      return new Response('Invalid request', { status: 405 });
    }
    const { to, subject, body, from = 'noreply@danscarlot.turneratlanta.com' } = await request.json();
    const response = await fetch(env.MAILCHANNELS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personalizations: [{ to: [{ email: to }] }], from: { email: from }, subject, content: [{ type: 'text/plain', value: body }] })
    });
    return response.ok
      ? new Response(JSON.stringify({ success: true }), { status: 200 })
      : new Response(JSON.stringify({ error: 'Email failed' }), { status: 500 });
  }
};
