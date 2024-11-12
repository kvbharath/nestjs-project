import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/userSetting';
import { CreateUserSettingsInput } from '../utils/createUserSettingsInput';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';
import { UserSettingService } from 'src/users/userSettingService';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingService) {}
  @Mutation((returns) => UserSetting)
  async createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    const userSetting = await this.userSettingsService.createUserSettings(
      createUserSettingsData,
    );
    return userSetting;
  }
}
