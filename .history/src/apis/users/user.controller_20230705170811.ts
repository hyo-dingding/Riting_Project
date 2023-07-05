import { Controller, Post, Body, ValidationPipe, HttpCode, Get, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AccessTokenDto, ReqDto, ResDto } from "src/commons/types/context";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("email")
    async getUserByEmail(
        @Query("email") email: string //
    ) {
        return this.userService.findByEmail(email);
    }

    @Post("/signup")
    async signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<ResDto> {
        const accessToken: AccessTokenDto = await this.userService.signup(createUserDto);
        return {
            statusCode: 201,
            message: "SIGNUP_SUCCESS",
            data: accessToken,
        };
    }

    @HttpCode(200)
    @Post("/login")
    async login(@Body(ValidationPipe) reqDto: ReqDto): Promise<ResDto> {
        const accessToken: AccessTokenDto = await this.userService.login(reqDto);
        return {
            statusCode: 200,
            message: "LOGIN_SUCCESS",
            data: accessToken,
        };
    }
}
