var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://sprout-f30ce.firebaseio.com/'
});

module.export = admin
