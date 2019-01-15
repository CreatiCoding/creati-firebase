
var { google } = require('googleapis');
var PROJECT_ID = 'creati-firebase';
var HOST = 'fcm.googleapis.com';
var PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
var SCOPES = [MESSAGING_SCOPE];

(() => {
    return new Promise(function (resolve, reject) {
        var key = require('./creati-firebase-firebase-adminsdk-8pb9t-7d476462e1.json');
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
})().then(r => {
    console.log(r);
});
