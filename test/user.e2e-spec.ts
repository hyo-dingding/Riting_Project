import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach } from "node:test";
import { AppModule } from "src/app.module";
import request from "supertest";

// let accessToken = null;
// let app: null;

describe("회원 (e2e) ", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        const res = await request(app.getHttpServer()).post("/user/signup").send({
            email: "test@test.com",
            password: "1234",
        });
        accessToken = res.body.date.accessToken;
    });

    // 회원 가입 API 테스트

    let accessToken = null;
    let email = null;

    describe("회원 API 테스트", () => {
        describe("회원가입", () => {
            it("회원가입 성공 201 /users/signup (POST)", async () => {
                email = String(Math.floor(Math.random() * 10000000)) + "test@test.com";
                const res = await request(app.getHttpServer()).post("/users/signup").send({
                    email: email,
                    password: "1234",
                });
                expect(res.statusCode).toBe(201);
                expect(res.body.data).toHaveProperty("accessToken");
                return;
            });

            it("회원가입 실패 400 /users/signup (POST)", async () => {
                const res = await request(app.getHttpServer()).post("/users/signup").send({
                    email: "1234",
                    password: "1234",
                });
                expect(res.statusCode).toBe(400);
                return;
            });

            it("회원가입 실패 409 /users/signup (POST)", async () => {
                const res = await request(app.getHttpServer()).post("/users/signup").send({
                    email: email,
                    password: "1234",
                });
                expect(res.statusCode).toBe(409);
                expect(res.body.code).toBe("CONFLICT_EMAIL");
                return;
            });

            // 로그인 API 테스트

            describe("로그인", () => {
                it("로그인 성공 200 /users/signin (POST)", async () => {
                    const res = await request(app.getHttpServer()).post("/users/signin").send({
                        email: "test@test.com",
                        password: "1234",
                    });

                    expect(res.statusCode).toBe(200);
                    expect(res.body.data).toHaveProperty("accessToken");
                    return;
                });

                it("로그인 실패 400 /users/signin (POST)", async () => {
                    const res = await request(app.getHttpServer()).post("/users/signin").send({
                        email: "test",
                        password: "1234",
                    });

                    expect(res.statusCode).toBe(400);
                    return;
                });

                it("로그인 실패 401 /users/signin (POST)", async () => {
                    const res = await request(app.getHttpServer()).post("/users/signin").send({
                        email: "test@test.com",
                        password: "12345",
                    });

                    expect(res.statusCode).toBe(401);
                    expect(res.body.code).toBe("UNAUTHORIZED_ACCOUNT");
                    return;
                });
            });
        });
    });
});
