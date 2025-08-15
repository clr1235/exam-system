import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  @Inject(PrismaService)
  private prismaService: PrismaService;

  async create(data: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({
      data,
      select: {
        id: true,
      },
    });
  }
}
