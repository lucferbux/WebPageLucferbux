// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


import * as functions from 'firebase-functions';
import * as path from 'path';

const app = require(path.resolve(__dirname, "./dist/server/main")).app; // change the path according to your project structure
const myApp = functions.https.onRequest(app());