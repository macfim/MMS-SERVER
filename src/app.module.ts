import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './shared/guards';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import envConfig from './config/env.config';
import { validate } from './env.validation';
import { MoneyStacksModule } from './money-stacks/money-stacks.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [envConfig],
      expandVariables: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CacheModule.register({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    MoneyStacksModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
