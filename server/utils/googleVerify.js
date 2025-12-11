const admin = require("firebase-admin");

// Inisialisasi firebase-admin sekali saja.
// - Di Vercel: gunakan env FIREBASE_SERVICE_ACCOUNT (isi JSON service account)
// - Di lokal: fallback ke GOOGLE_APPLICATION_CREDENTIALS (applicationDefault)
if (!admin.apps.length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
}

async function verifyGoogleIdToken(idToken) {
  const decoded = await admin.auth().verifyIdToken(idToken);

  return {
    email: decoded.email,
    name: decoded.name || decoded.email,
    picture: decoded.picture,
  };
}

module.exports = { verifyGoogleIdToken };
