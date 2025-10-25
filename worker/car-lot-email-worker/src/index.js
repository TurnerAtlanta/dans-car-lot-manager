export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { to, subject, body, from = 'noreply@danscarlot.turneratlanta.com' } = await request.json();

    const emailData = {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      subject: subject,
      content: [{ type: 'text/plain', value: body }]
    };

    try {
      const response = await fetch(env.MAILCHANNELS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error(`Email send failed: ${response.status}`);
      }

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
};
