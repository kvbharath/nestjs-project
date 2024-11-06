import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewPasswordColumn1730800595552 implements MigrationInterface {
    name = 'AddNewPasswordColumn1730800595552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
