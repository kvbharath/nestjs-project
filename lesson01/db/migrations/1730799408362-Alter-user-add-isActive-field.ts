import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserAddIsActiveField1730799408362 implements MigrationInterface {
    name = 'AlterUserAddIsActiveField1730799408362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT 'true'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
    }

}
