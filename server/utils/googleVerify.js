const { OAuth2Client } = require("google-auth-library");

// GOOGLE_CLIENT_ID harus diisi di file .env sesuai Client ID dari Firebase project
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleIdToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
}

module.exports = { verifyGoogleIdToken };
