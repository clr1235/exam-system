import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { RedisService } from '@app/redis';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @Inject(RedisService)
  private redisService: RedisService;

  @Get()
  async getHello() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const keys = await this.redisService.keys('*');
    return this.userService.getHello() + keys;
  }
}
