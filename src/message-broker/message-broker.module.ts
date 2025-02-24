import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.MESSAGE_BROKER_NAME!,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: 'formatted-messages',
          queueOptions: {
            durable: false,
          },
          exchange: ''
        },
      },
    ]),
  ],
})
export class MessageBrokerModule {}
