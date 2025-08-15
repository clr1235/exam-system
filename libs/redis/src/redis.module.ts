import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await client.connect();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return client;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
