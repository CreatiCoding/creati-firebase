# Firebase Cloud Messaging

## 0. Firebase Cloud Messaging 로 할 수 있는 것들

https://firebase.google.com/docs/cloud-messaging/?hl=ko

## 1. Firebase Console 에 프로젝트 추가

- 101 과 동일

## 2. Project 생성

#### 1) 따라치기
```
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

#### 2) firebase login 시 브라우저를 통해 로그인

![image](https://user-images.githubusercontent.com/33514304/51135113-a08b3600-187c-11e9-98cb-a65ad3c5fadf.png)

![image](https://user-images.githubusercontent.com/33514304/51135120-a41ebd00-187c-11e9-8c4f-cd65e12c627b.png)

![image](https://user-images.githubusercontent.com/33514304/51135135-b13bac00-187c-11e9-8f55-eb1793912adc.png)

#### 3) Firebase init 프로젝트 생성

![image](https://user-images.githubusercontent.com/33514304/51138267-04652d00-1884-11e9-9ced-fd98fa7bb928.png)

## 4. Firebase Hosting 배포

#### 1) Firebase HTML 파일에 설정 추가

https://firebase.google.com/docs/web/setup?hl=ko

![image](https://user-images.githubusercontent.com/33514304/51151377-fdebab00-18ad-11e9-81c2-0692a6b8f2f4.png)

![image](https://user-images.githubusercontent.com/33514304/51151425-2e334980-18ae-11e9-99d2-adaa6fb881da.png)

##### 웹 푸시 인증서 발급

![image](https://user-images.githubusercontent.com/33514304/51151477-5f137e80-18ae-11e9-9967-ae60d58443eb.png)

##### 서비스 계정 -> 비공개키 다운로드

![image](https://user-images.githubusercontent.com/33514304/51151521-971ac180-18ae-11e9-969f-65cf0d134526.png)

#### 2) subscribe HTML 파일 작성

https://github.com/CreatiCoding/creati-firebase/blob/master/CodeLabs/workspace/301/public/subscribe.html

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to Firebase Hosting</title>
    <script src="https://www.gstatic.com/firebasejs/5.7.3/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.5.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.5.2/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.5.2/firebase-database.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.5.2/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.5.2/firebase-messaging.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.5.2/firebase-functions.js"></script>
    <script>
        var config = {
            apiKey: "AIzaSyAVEor8s345aVdHly7n_Z9eKthm318_VtY",
            authDomain: "creati-firebase.firebaseapp.com",
            databaseURL: "https://creati-firebase.firebaseio.com",
            projectId: "creati-firebase",
            storageBucket: "creati-firebase.appspot.com",
            messagingSenderId: "262117930691"
        };
        firebase.initializeApp(config);
    </script>
</head>

<body>
    <button type="button" onclick="subscribe()">공지사항 구독</button><br>
    <script>
        window.messaging = firebase.messaging();
        window.messaging.usePublicVapidKey("BGotnagSqkhEwQkyWZYmWcPzzMeOKWiwENh4u1FsCA5FrIWA7mcBKlk8mNE2GEoMZsF5G3jSrIKIql_ov6k2kSM");
        function subscribe() {
            window.messaging.requestPermission().then(function () {
                console.log('Notification permission granted.');
                checkSubscribe();
            }).catch(function (err) {
                console.log('Unable to get permission to notify.', err);
            });
        }
        function checkSubscribe() {
            window.messaging.getToken().then(function (currentToken) {
                if (currentToken) {
                    console.log(currentToken);
                } else {
                    console.log('No Instance ID token available. Request permission to generate one.');
                }
            }).catch(function (err) {
                console.log('An error occurred while retrieving token. ', err);
            });
        }
    </script>
</body>

</html>
```


#### 3) Cloud Function 파일 작성

https://github.com/CreatiCoding/creati-firebase/blob/master/CodeLabs/workspace/301/functions/index.js

```javascript
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
```

#### 4) 배포

![image](https://user-images.githubusercontent.com/33514304/51151674-07294780-18af-11e9-974d-3b5e226233d7.png)

#### 5) 시연

https://creati-firebase.firebaseapp.com/subscribe.html
