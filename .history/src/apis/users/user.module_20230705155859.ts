import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserService } from './user.service';
// import { JwtStrategy } from 'src/commons/auth/jwt-access.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [JwtAccessStrategy, UserService, JwtRefreshStrategy],
})
export class UsersModule {}
