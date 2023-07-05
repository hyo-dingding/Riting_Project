# Riting_Project

## Tech Stacks
- Nest.js Framework
- mySQL
- TypeORM
- Postman


## Postman
<img width="920" alt="login png" src="https://github.com/hyo-dingding/Riting_Project/assets/107694757/adaea4f2-b880-4f53-864c-df2b1bc1fe8b">
<img width="921" alt="signup png" src="https://github.com/hyo-dingding/Riting_Project/assets/107694757/acdb8a84-1cb8-4c28-a430-029373b19f16">
<img width="923" alt="email" src="https://github.com/hyo-dingding/Riting_Project/assets/107694757/bbd05c6b-c0ac-4c2e-b49d-dd51ef112b67">


## Environment
환경 변수는 프로젝트의 루트 패스 기준으로 .env 라는 이름으로 파일을 생성해서 아래 내용을 기입해주시면 됩니다.

![image](https://github.com/hyo-dingding/Riting_Project/assets/107694757/48836888-2e9b-412c-b16a-ce1a3a9973cb)

## 환경변수 내용
```
JWT_SECRET=

DEV_DB_TYPE=mysql
DEV_DB_HOST=
DEV_DB_PORT=3306
DEV_DB_USERNAME=
DEV_DB_PASSWORD=
DEV_DB_DATABASE=

DATABASE_ROOT_PASSWORD=
```
## Running the app
데모를 실행해보실 때는 npm run start로 실행해보시면 됩니다.
```
# development
$ yarn start

# watch mode
$ yarn start:dev
```
## Test
```
$ yarn test:e2e

```
