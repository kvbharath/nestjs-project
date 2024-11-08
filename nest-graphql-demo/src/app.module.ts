import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolvers/userResolver';
import { UserSettingsResolver } from './graphql/resolvers/userSettingsResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './graphql/models/user';
import { UserSetting } from './graphql/models/userSetting';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'bharath',
      password: 'admin',
      database: 'graphql',
      entities: [User, UserSetting],
      synchronize: true,
      // entities: ['dist/**/*.entity.js'],
      // migrations: ['dist/db/migrations/*.js'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, UserSettingsResolver],
})
export class AppModule {}
