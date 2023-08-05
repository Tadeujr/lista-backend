import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../dto/login/login.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @ApiBody({ type: LoginDto })
    @Post('login')
    @ApiOperation({ summary: 'Login, returna um token e o id do usuário' })
    async login(@Req() req) {
        return await this.authService.login(req.user);
    }
}
