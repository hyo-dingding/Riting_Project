import { Repository } from 'typeorm';
import {
  Injectable,
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AccessTokenDto, ReqDto } from 'src/commons/types/context';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 이메일 찾기
  async findByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'username', 'phone'],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'DB_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 회원가입
  async signup(createUserDto: CreateUserDto): Promise<AccessTokenDto> {
    const { email, password, username, phone } = createUserDto;

    // 이메일 중복 확인
    const existingUser: User = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이메일이 이미 존재합니다.'); // 이메일 중복 확인
    }
    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt); // DB 암호화

    // 사용자 생성
    const newUser: User = this.userRepository.create({
      email,
      password: hashedPassword,
      username,
      phone,
    });

    await this.userRepository.save(newUser);

    // JWT 토큰 생성
    const payload = { sub: newUser.id, email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });

    // 엑세스 토큰 객체 생성
    const accessTokenDto: AccessTokenDto = {
      accessToken,
      refreshToken,
    };
    return accessTokenDto;
  }

  // 로그인
  async login(reqDto: ReqDto): Promise<AccessTokenDto> {
    const { email, password } = reqDto;
    const user = await this.userRepository.findOne({ where: { email } });

    // 사용자 조회
    if (!user) {
      throw new UnauthorizedException('잘못된 이메일입니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일, 비밀번호가 틀렸습니다.');
    }
    // JWT 토큰 생성
    const payload = { sub: user.id, email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });

    // 엑세스 토큰 객체 생성
    const accessTokenDto: AccessTokenDto = {
      accessToken,
      refreshToken,
    };
    return accessTokenDto;
  }
}

//  사용자 생성
//  async createUser(createUserDto: CreateUserDto): Promise<User> {
//   try {
//     const { email, password, username, phone } = createUserDto;
//     const existingUser = await this.userRepository.findOne({ email });

//     if (existingUser) {
//       throw new ConflictException('이메일이 이미 존재합니다.');
//     }

//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = this.userRepository.create({
//       email,
//       password: hashedPassword,
//       username,
//       phone,
//     });

//     await this.userRepository.save(newUser);

//     return newUser;
//   } catch (error) {
//     throw new HttpException(
//       'Failed to create user',
//       HttpStatus.INTERNAL_SERVER_ERROR,
//     );
//   }
// }
