import { Injectable } from '@nestjs/common';
import { Channel, connect, Connection } from 'amqplib';

@Injectable()
export default class RabbitmqService {
  private conn: Connection;
  private channel: Channel;

  private async start(): Promise<void> {
    this.conn = await connect(process.env.RABBTIMQ_URL);
    this.channel = await this.conn.createChannel();
  }

  constructor() {
    this.start();
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    content: any,
  ): Promise<Boolean> {
    return this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(content)),
      {
        persistent: true,
      },
    );
  }
}
