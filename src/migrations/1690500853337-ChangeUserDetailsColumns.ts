import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserDetailsColumns1690500853337 implements MigrationInterface {
    name = 'ChangeUserDetailsColumns1690500853337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(80), "phone" character varying(12), "contactTitle" character varying(50), "userId" uuid, CONSTRAINT "UQ_42e76b6caff9774b64ca0f8f712" UNIQUE ("email"), CONSTRAINT "UQ_2fc7a9d3911c5558e5d5c91286c" UNIQUE ("phone"), CONSTRAINT "PK_35f9ec44d0772d64d68f5417c6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "password" character varying(150) NOT NULL, "image" text, "addedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "image" text, "addedAt" date NOT NULL DEFAULT now(), "email" character varying(80) NOT NULL, "phone" character varying(12) NOT NULL, CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "UQ_84cae51c485079bdd8cdf1d828f" UNIQUE ("phone"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts_users_users" ("contactsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_e9c58bce99bf7077fd6d0760cf4" PRIMARY KEY ("contactsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35dd51cdc9c7969897d2a7e44b" ON "contacts_users_users" ("contactsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1f5a98e8d7d43fb4aa858dda66" ON "contacts_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "FK_bc921f94cf80b18caec31751583" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts_users_users" ADD CONSTRAINT "FK_35dd51cdc9c7969897d2a7e44b4" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contacts_users_users" ADD CONSTRAINT "FK_1f5a98e8d7d43fb4aa858dda66a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts_users_users" DROP CONSTRAINT "FK_1f5a98e8d7d43fb4aa858dda66a"`);
        await queryRunner.query(`ALTER TABLE "contacts_users_users" DROP CONSTRAINT "FK_35dd51cdc9c7969897d2a7e44b4"`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "FK_bc921f94cf80b18caec31751583"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1f5a98e8d7d43fb4aa858dda66"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35dd51cdc9c7969897d2a7e44b"`);
        await queryRunner.query(`DROP TABLE "contacts_users_users"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "userDetails"`);
    }

}
