import { MigrationInterface, QueryRunner } from "typeorm";

export class Changes1690329182987 implements MigrationInterface {
    name = 'Changes1690329182987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "FK_bc921f94cf80b18caec31751583"`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "FK_b95d92c708ecfa06a4a9527ce4e"`);
        await queryRunner.query(`CREATE TABLE "contacts_users_users" ("contactsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_e9c58bce99bf7077fd6d0760cf4" PRIMARY KEY ("contactsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35dd51cdc9c7969897d2a7e44b" ON "contacts_users_users" ("contactsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1f5a98e8d7d43fb4aa858dda66" ON "contacts_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD "email" character varying(80) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "FK_bc921f94cf80b18caec31751583" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "FK_b95d92c708ecfa06a4a9527ce4e" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts_users_users" ADD CONSTRAINT "FK_35dd51cdc9c7969897d2a7e44b4" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contacts_users_users" ADD CONSTRAINT "FK_1f5a98e8d7d43fb4aa858dda66a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts_users_users" DROP CONSTRAINT "FK_1f5a98e8d7d43fb4aa858dda66a"`);
        await queryRunner.query(`ALTER TABLE "contacts_users_users" DROP CONSTRAINT "FK_35dd51cdc9c7969897d2a7e44b4"`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "FK_b95d92c708ecfa06a4a9527ce4e"`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP CONSTRAINT "FK_bc921f94cf80b18caec31751583"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userDetails" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD "email" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "name" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "userId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1f5a98e8d7d43fb4aa858dda66"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35dd51cdc9c7969897d2a7e44b"`);
        await queryRunner.query(`DROP TABLE "contacts_users_users"`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "FK_b95d92c708ecfa06a4a9527ce4e" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userDetails" ADD CONSTRAINT "FK_bc921f94cf80b18caec31751583" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
