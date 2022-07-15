import {MigrationInterface, QueryRunner} from "typeorm";

export class address2Employee1657817511821 implements MigrationInterface {
    name = 'address2Employee1657817511821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "address" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "address" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "district" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "zip" integer NOT NULL`);
    }

}
