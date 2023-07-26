import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrate1690305586332 implements MigrationInterface {
    name = 'InitialMigrate1690305586332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "password" character varying(50) NOT NULL, "image" text, "addedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(150) NOT NULL, "phone" character varying(12) NOT NULL, "userId" uuid, "contactId" uuid, CONSTRAINT "PK_35f9ec44d0772d64d68f5417c6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "image" text, "addedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "FK_bc921f94cf80b18caec31751583" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "FK_b95d92c708ecfa06a4a9527ce4e" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "FK_b95d92c708ecfa06a4a9527ce4e"`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "FK_bc921f94cf80b18caec31751583"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "userDetails"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
