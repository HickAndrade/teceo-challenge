import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItems1750118726254 implements MigrationInterface {
    name = 'CreateItems1750118726254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."items_status_enum" AS ENUM('success', 'error')`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "size" character varying NOT NULL, "color" character varying NOT NULL, "quantity" integer NOT NULL, "status" "public"."items_status_enum" NOT NULL DEFAULT 'success', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TYPE "public"."items_status_enum"`);
    }

}
