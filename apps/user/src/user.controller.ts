import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RedisService } from '@app/redis';
import { EmailService } from '@app/email';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RequireLogin, UserInfo } from '@app/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    // // 数据库的user表中没有captcha字段，所以在调用之前删除该字段
    // delete registerUser.captcha;

    return await this.userService.register(registerUser);
  }

  @Get('register-captcha')
  async getCaptcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${address}`, code, 60 * 5);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<p>您的注册验证码为：${code}</p>`,
    });

    return '验证码发送成功';
  }

  @Post('login')
  async login(@Body() loginUser: LoginUserDto) {
    const user = await this.userService.login(loginUser);

    return {
      user,
      token: this.jwtService.sign(
        { userId: user.id, username: user.username },
        {
          expiresIn: '7d',
        },
      ),
    };
  }

  @Get('aaa')
  @RequireLogin()
  aaa(@UserInfo() userInfo, @UserInfo('username') username) {
    console.log(userInfo, '--->>>', username);
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
