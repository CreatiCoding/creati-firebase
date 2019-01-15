# Firebase Hosting for static resource


## 0. Firebase Hosting 으로 할 수 있는 것들

https://firebase.google.com/docs/hosting/use-cases?hl=ko

## 1. Firebase Console 에 프로젝트 추가

![image](https://user-images.githubusercontent.com/33514304/51134690-9f0d3e00-187b-11e9-92f9-4ff499c01d0b.png)

#### 1) https://console.firebase.google.com/ 로그인
#### 2) 프로젝트 추가 클릭
#### 3) 양식 작성 후 프로젝트 만들기

## 2. Firebase Hosting 시작

![image](https://user-images.githubusercontent.com/33514304/51134785-d4b22700-187b-11e9-8025-295a4e79260b.png)

#### 1) 개발 -> Hosting -> 시작하기 -> 계속 -> 완료

![image](https://user-images.githubusercontent.com/33514304/51134822-edbad800-187b-11e9-9b6e-864327421268.png)

## 3. Project 생성

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

![image](https://user-images.githubusercontent.com/33514304/51136012-caddf300-187e-11e9-948d-7694169a2088.png)

## 4. Firebase Hosting 배포

#### 1) public 디렉토리에 파일 생성

```bash
echo "<h1>Hello Pet Friends</h1>" > public/pf.html
```

#### 2) 배포


```bash
firebase deploy
````

![image](https://user-images.githubusercontent.com/33514304/51136189-3d4ed300-187f-11e9-852f-33c2903d0343.png)

![image](https://user-images.githubusercontent.com/33514304/51136226-4cce1c00-187f-11e9-8673-35b9b37192f4.png)


