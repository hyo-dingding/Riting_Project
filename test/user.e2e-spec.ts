import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import request from "supertest";
import { JwtAccessStrategy } from "../src/commons/auth/jwt-access.strategy";
import { JwtRefreshStrategy } from "../src/commons/auth/jwt-refresh.strategy";

let accessToken: string;
let email: string;

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [JwtAccessStrategy, JwtRefreshStrategy],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const res = await request(app.getHttpServer()).post("/user/signup").send({
            email: "test@test.com",
            password: "1234",
        });

        accessToken = res.body.data.accessToken;
    });

    // 회원 가입 API 테스트

    describe("회원 API 테스트", () => {
        describe("회원가입", () => {
            it("회원가입 성공 201 /user/signup (POST)", async () => {
                email = String(Math.floor(Math.random() * 10000000)) + "test@test.com";
                const res = await request(app.getHttpServer()).post("/user/signup").send({
                    email: email,
                    username: "test1",
                    password: "1234",
                });

                expect(res.statusCode).toBe(201);
                expect(res.body.data).toHaveProperty("accessToken");
                return;
            });

            it("회원가입 실패 400 /user/signup (POST)", async () => {
                const res = await request(app.getHttpServer()).post("/user/signup").send({
                    email: "1234",
                    username: "test",
                    password: "1234",
                });

                expect(res.statusCode).toBe(400);
                return;
            });

            it("회원가입 실패 409 /user/signup (POST)", async () => {
                const res = await request(app.getHttpServer()).post("/user/signup").send({
                    email: email,
                    username: "test",
                    password: "1234",
                });

                expect(res.statusCode).toBe(409);
                // expect(res.body.code).toBe('CONFLICT_EMAIL');
                return;
            });
        });

        // 로그인 API 테스트

        describe("로그인", () => {
            it("로그인 성공 200 /user/login (POST)", async () => {
                const res = await request(app.getHttpServer()).post("/user/login").send({
                    email: "test@test.com",
                    password: "1234",
                });

                expect(res.statusCode).toBe(200);
                expect(res.body.data).toHaveProperty("accessToken");
                return;
            });

            it("로그인 실패 401 /user/login (POST)", async () => {
                const res = await request(app.getHttpServer()).post("/user/login").send({
                    email: "test",
                    password: "1234",
                });

                expect(res.statusCode).toBe(401);
                expect(res.body.data).toBeUndefined();
                return;
            });

            it("로그인 실패 401 /user/login (POST)", async () => {
                const res = await request(app.getHttpServer()).post("/user/login").send({
                    email: "test@test.com",
                    password: "12345",
                });

                expect(res.statusCode).toBe(401);
                expect(res.body.data).toBeUndefined();
                return;
            });
        });
    });
});
