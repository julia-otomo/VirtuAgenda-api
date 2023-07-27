import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserDetailsInformation1690394147024 implements MigrationInterface {
    name = 'ChangeUserDetailsInformation1690394147024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "UQ_42e76b6caff9774b64ca0f8f712" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "UQ_2fc7a9d3911c5558e5d5c91286c" UNIQUE ("phone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "UQ_2fc7a9d3911c5558e5d5c91286c"`);
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "UQ_42e76b6caff9774b64ca0f8f712"`);
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "email" SET NOT NULL`);
    }

}
