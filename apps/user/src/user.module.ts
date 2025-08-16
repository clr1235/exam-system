import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisModule } from '@app/redis';
import { PrismaModule } from '@app/prisma';
import { EmailModule } from '@app/email';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '@app/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/common/auth.guard';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    EmailModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: 'rong',
        signOptions: { expiresIn: '30m' },
      }),
    }),
    CommonModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserModule {}
