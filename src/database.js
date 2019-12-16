const admin = require("firebase-admin");

const serviceAccount = require("../../service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pmtool-9af96.firebaseio.com"
});

const database = admin.database();

module.exports = database;