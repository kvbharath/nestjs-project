import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'bharath',
  password: 'admin',
  database: 'nestjs',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
