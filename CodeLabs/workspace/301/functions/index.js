const functions = require('firebase-functions');
const request = require("request");
var { google } = require('googleapis');

const my_token = "duIY5J4xWMo:APA91bGyjiM34O44m9eV2xMoQR8dbbS6spRoDsFxIL94ybxa_yD5LP6hPx_DgNaURCrUkl43TkS09xV3BNXIHia3BPXH16zZ-BA06ILUwhya9WRixIPi9HQDkQRtZeJBsP1FbFM8PZd2";

exports.requestFCM = functions.https.onRequest((req, res) => {

    // GET query parameter
    let name = (req.query.name === undefined) ? '고객' : req.query.name;
    let token_id = (req.query.token_id === undefined) ? my_token : req.query.token_id;

    // POST body parameter
    name = (req.body.name === undefined) ? req.query.name : req.body.name;
    token_id = (req.body.token_id === undefined) ? req.query.token_id : req.body.token_id;

    // 엑세스 키 발급
    return new Promise((resolve) => {
        var key = require('./creati-firebase-firebase-adminsdk-8pb9t-7d476462e1.json');
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/firebase.messaging'],
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
        // 메세지 전송
    }).then(access_token => {
        let url = 'https://fcm.googleapis.com/v1/projects/creati-firebase/messages:send';
        // fire request
        request({
            url: url,
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: ' Bearer ' + access_token
            },
            json: {
                "message": {
                    "notification": {
                        "title": "폣프렌즈 공지사항!",
                        "body": `${name} 님! 신상품이 나왔어요!`,
                    },
                    "token": token_id
                }
            }
        }, () => {
            res.send(true);
        });
    });
});
