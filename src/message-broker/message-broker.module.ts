import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [],
  providers: [
    MessageBrokerModule,
  ],
  exports: [
    MessageBrokerModule,
  ]
})
export class MessageBrokerModule {}
