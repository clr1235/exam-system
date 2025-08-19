import {
  BadRequestException,
  Get,
  Inject,
  Injectable,
  Query,
} from '@nestjs/common';
import { AddAnswerDto } from './dto/add-answer.dto';
import { PrismaService } from '@app/prisma';
import { ExcelService } from '@app/excel';

@Injectable()
export class AnswerService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  getHello(): string {
    return 'Hello World!';
  }

  async add(dto: AddAnswerDto, userId: number) {
    return await this.prismaService.answer.create({
      data: {
        content: dto.content,
        score: 0,
        answerer: {
          connect: {
            id: userId,
          },
        },
        exam: {
          connect: {
            id: dto.examId,
          },
        },
      },
    });
  }

  async list(examId: number) {
    return this.prismaService.answer.findMany({
      where: {
        examId,
      },
      include: {
        exam: true,
        answerer: true,
      },
    });
  }

  async find(id: number) {
    return this.prismaService.answer.findUnique({
      where: {
        id,
      },
      include: {
        exam: true,
        answerer: true,
      },
    });
  }
}
