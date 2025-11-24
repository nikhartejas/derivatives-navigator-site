const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    // Netlify form submission payload
    const body = JSON.parse(event.body || "{}");

    const payload = body.payload
      ? JSON.parse(body.payload).data
      : body.data || body;

    const name =
      payload.name && Array.isArray(payload.name)
        ? payload.name[0]
        : payload.name || "";

    const email =
      payload.email && Array.isArray(payload.email)
        ? payload.email[0]
        : payload.email;

    const whatsapp =
      payload.whatsapp && Array.isArray(payload.whatsapp)
        ? payload.whatsapp[0]
        : payload.whatsapp || "";

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required" }),
      };
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID, 10);

    // Create / update contact
    const contactBody = {
      email: email,
      attributes: {
        FIRSTNAME: name || "",
        WHATSAPP: whatsapp || "",
      },
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    };

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(contactBody),
    });

    const result = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, brevo: result }),
    };
  } catch (err) {
    console.error("subscribe error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", detail: err.message }),
    };
  }
};
