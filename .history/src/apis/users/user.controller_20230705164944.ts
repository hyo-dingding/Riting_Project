import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
import { AccessTokenDto, ReqDto, ResDto } from 'src/commons/types/context';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ResDto> {
    const accessToken: AccessTokenDto = await this.userService.signup(
      createUserDto,
    );
    return {
      statusCode: 201,
      message: 'SIGNUP_SUCCESS',
      data: accessToken,
    };
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body(ValidationPipe) reqDto: ReqDto): Promise<ResDto> {
    const accessToken: AccessTokenDto = await this.userService.login(reqDto);
    return {
      statusCode: 200,
      message: 'LOGIN_SUCCESS',
      data: accessToken,
    };
  }

  /////////////////
  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<User> {
  //   return this.userService.findOne(id);
  // }

  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.createUser(createUserDto);
  // }

  // @Put(':id')
  // updateUser(
  //   @Param('id') id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<User> {
  //   return this.userService.updateUser(id, updateUserDto);
  // }

  // @Delete(':id')
  // removeUser(@Param('id') id: number): Promise<void> {
  //   return this.userService.removeUser(id);
  // }
}
