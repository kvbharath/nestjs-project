import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../models/userSetting';
import { CreateUserSettingsInput } from '../utils/createUserSettingsInput';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';

@Resolver()
export class UserSettingsResolver {
  @Mutation((returns) => UserSetting)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    console.log(createUserSettingsData);
    mockUserSettings.push(createUserSettingsData);
    return createUserSettingsData;
  }
}
