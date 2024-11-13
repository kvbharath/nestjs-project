import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UserCreatedEvent } from './events/user-created-user';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { resolve } from 'path';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private scheduleRegistry: SchedulerRegistry,
  ) {}
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }
  async createUser(body: CreateUserRequest) {
    const userId = '123';
    this.logger.log('Creating user..', body);
    this.eventEmitter.emit(
      'user.created',
      new UserCreatedEvent(userId, body.email),
    );
    //establish websocket timeout
    const establishWsTimeout = setTimeout(
      () => this.establishWsConnection(userId),
      5000,
    );
    this.scheduleRegistry.addTimeout(
      `${userId}_establish_ws`,
      establishWsTimeout,
    );
  }

  private establishWsConnection(userId: string) {
    this.logger.log('Establishing WS connection with user..', userId);
  }
  @OnEvent('user.created')
  welcomeNewUser(payload: UserCreatedEvent) {
    this.logger.log(`Welcome ${payload.email} to our platform!`);
  }

  @OnEvent('user.created', { async: true })
  async sendWelcomeGift(payload: UserCreatedEvent) {
    this.logger.log('Sending welcome gift..', payload.email);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log('Welcome gift sent..', payload.email);
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'delete_expired_users' })
  deleteExpiredUsers() {
    this.logger.log('Deleting expired users..');
    // Delete expired users logic here
  }
}
