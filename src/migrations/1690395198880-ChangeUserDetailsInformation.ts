import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserDetailsInformation1690395198880 implements MigrationInterface {
    name = 'ChangeUserDetailsInformation1690395198880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "phone" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "email" DROP NOT NULL`);
    }

}
