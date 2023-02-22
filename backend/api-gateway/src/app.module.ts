import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/gateway.module';
import { MyGateway } from './gateway/gateway';
import { WeatherService } from './weather.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ANIMALS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'animals',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'animals-consumer',
          },
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
    ConfigModule.forRoot(),
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, MyGateway, WeatherService],
})
export class AppModule {}
