import { Module } from '@nestjs/common';
import { UserResolver } from './userResolver';
import { UserService } from './userService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/user';
import { UserSettingService } from './userSettingService';
import { UserSetting } from 'src/graphql/models/userSetting';
import { UserSettingsResolver } from 'src/graphql/resolvers/userSettingsResolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UserResolver,
    UserService,
    UserSettingService,
    UserSettingsResolver,
  ],
})
export class UsersModule {}
