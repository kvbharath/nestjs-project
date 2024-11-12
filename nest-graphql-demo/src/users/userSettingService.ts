import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { User } from 'src/graphql/models/user';
import { UserSetting } from 'src/graphql/models/userSetting';
import { CreateUserSettingsInput } from 'src/graphql/utils/createUserSettingsInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUserSettingById(userId: number) {
    return this.userSettingRepository.findOneBy({ userId });
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUserSettingsData.userId,
    });
    if (!findUser) throw new Error('User not found');

    const newUserSetting = this.userSettingRepository.create(
      createUserSettingsData,
    );

    const savedSettings = await this.userSettingRepository.save(newUserSetting);

    findUser.settings = savedSettings;

    await this.userRepository.save(findUser);

    return savedSettings;
  }
}
