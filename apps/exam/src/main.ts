import { NestFactory } from '@nestjs/core';
import { ExamModule } from './exam.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ExamModule);

  // 暴露8888的TCP服务
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
