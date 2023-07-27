import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeContactEntity1690399092071 implements MigrationInterface {
    name = 'ChangeContactEntity1690399092071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "FK_b95d92c708ecfa06a4a9527ce4e"`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP COLUMN "contactId"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "email" character varying(80) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "phone" character varying(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_84cae51c485079bdd8cdf1d828f" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_84cae51c485079bdd8cdf1d828f"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_752866c5247ddd34fd05559537d"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD "contactId" uuid`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "FK_b95d92c708ecfa06a4a9527ce4e" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
