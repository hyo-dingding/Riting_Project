import { PartialType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    email?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    username?: string;
}
