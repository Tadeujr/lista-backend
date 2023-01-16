import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from '../../services/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/controllers/auth/strategies/local.strategy';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { JwtStrategy } from 'src/controllers/auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({privateKey:process.env.JWT_SECRET_KEY,
    signOptions:{expiresIn:"2 days"}
})
],
    controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
