import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { RedisModule } from '@app/redis';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from '@app/prisma';
import { CommonModule } from '@app/common';
import { AuthGuard } from '@app/common/auth.guard';

@Module({
  imports: [RedisModule, PrismaModule, CommonModule],
  controllers: [ExamController],
  providers: [
    ExamService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ExamModule {}
