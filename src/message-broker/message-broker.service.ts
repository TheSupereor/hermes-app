import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MessageBrokerService implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
					'amqp://localhost:5672'
				],
        queue: 'messages-queue',
        queueOptions: {
          durable: true,
					// Expiração de mensagens e envio para fila especializada
					messageTtl: 30000,
					deadLetterExchange: 'dead_letter_exchange',
					deadLetterRoutingKey: 'dead_letter_key'
        },
      },
    });
  }

	// instancia e retorna o instanciado
	getClient(): ClientProxy {
		return this.client
	}
}
