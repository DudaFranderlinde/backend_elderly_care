import { MigrationInterface, QueryRunner } from "typeorm";

export class Entidades1717116842928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "elder" ("id_elder" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "photo" character varying NOT NULL, "date_birth" character varying NOT NULL, "ministration" character varying NOT NULL, "historic" character varying NOT NULL, "responsible_id" integer, "caregiver_id" integer, "address_id" integer, CONSTRAINT "UQ_15e75544e746d5f3b6a5ca76b93" UNIQUE ("cpf"), CONSTRAINT "REL_9b015533f0f76f41cf89b01dd9" UNIQUE ("address_id"), CONSTRAINT "PK_a6086e36c1395bec23d4346ddd7" PRIMARY KEY ("id_elder"))`);
        await queryRunner.query(`CREATE TYPE "public"."proposal_status_enum" AS ENUM('ENVIADO', 'ACEITO', 'RECUSADO')`);
        await queryRunner.query(`CREATE TABLE "proposal" ("id_proposal" SERIAL NOT NULL, "status" "public"."proposal_status_enum" NOT NULL DEFAULT 'ENVIADO', "caregiver_id" integer, "resposible_id" integer, CONSTRAINT "PK_86e880d17c245596947a4a91aaf" PRIMARY KEY ("id_proposal"))`);
        await queryRunner.query(`CREATE TABLE "caregiver" ("id_caregiver" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "photo" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "date_birth" character varying NOT NULL, "experience" character varying NOT NULL, "description_experience" character varying NOT NULL, "training_time" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "address_id" integer, CONSTRAINT "UQ_5b91fe2a241db0ede2d141fda3b" UNIQUE ("cpf"), CONSTRAINT "UQ_258d4803c24bfb2c9a0db4aea2c" UNIQUE ("email"), CONSTRAINT "REL_64334087b433a5c4b5a8c5d191" UNIQUE ("address_id"), CONSTRAINT "PK_223cdef637c5391b7b35d4098ef" PRIMARY KEY ("id_caregiver"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id_address" SERIAL NOT NULL, "cep" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "complement" character varying, CONSTRAINT "PK_8294a7da240377a44a4ce476047" PRIMARY KEY ("id_address"))`);
        await queryRunner.query(`CREATE TYPE "public"."responsible_kinship_enum" AS ENUM('FILHO(A)', 'NETO(A)', 'SOBRINHO(A)', 'RESPONSÁVEL LEGAL', 'OUTROS')`);
        await queryRunner.query(`CREATE TABLE "responsible" ("id_responsible" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "photo" character varying NOT NULL, "phone" character varying NOT NULL, "date_birth" character varying NOT NULL, "kinship" "public"."responsible_kinship_enum" NOT NULL, "email" character varying NOT NULL, "pass" character varying NOT NULL, "salt" character varying NOT NULL, "address_id" integer, CONSTRAINT "UQ_87cb82522792f9ef01825601849" UNIQUE ("cpf"), CONSTRAINT "UQ_b4678f820a8f55842a8bb774b16" UNIQUE ("email"), CONSTRAINT "REL_4bb779dd46607fb57379fb7350" UNIQUE ("address_id"), CONSTRAINT "PK_03daa7fce077ff7321669e1090b" PRIMARY KEY ("id_responsible"))`);
        await queryRunner.query(`ALTER TABLE "elder" ADD CONSTRAINT "FK_e51f466408b724dd60de020417c" FOREIGN KEY ("responsible_id") REFERENCES "responsible"("id_responsible") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "elder" ADD CONSTRAINT "FK_a9086479a977fdb3d7b925cae01" FOREIGN KEY ("caregiver_id") REFERENCES "caregiver"("id_caregiver") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "elder" ADD CONSTRAINT "FK_9b015533f0f76f41cf89b01dd9c" FOREIGN KEY ("address_id") REFERENCES "address"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "FK_7df239aa058013db1f15257d50d" FOREIGN KEY ("caregiver_id") REFERENCES "caregiver"("id_caregiver") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "FK_cd0f8b08885c77fd950be36b7a0" FOREIGN KEY ("resposible_id") REFERENCES "responsible"("id_responsible") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "caregiver" ADD CONSTRAINT "FK_64334087b433a5c4b5a8c5d1913" FOREIGN KEY ("address_id") REFERENCES "address"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responsible" ADD CONSTRAINT "FK_4bb779dd46607fb57379fb7350b" FOREIGN KEY ("address_id") REFERENCES "address"("id_address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "responsible" DROP CONSTRAINT "FK_4bb779dd46607fb57379fb7350b"`);
        await queryRunner.query(`ALTER TABLE "caregiver" DROP CONSTRAINT "FK_64334087b433a5c4b5a8c5d1913"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_cd0f8b08885c77fd950be36b7a0"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_7df239aa058013db1f15257d50d"`);
        await queryRunner.query(`ALTER TABLE "elder" DROP CONSTRAINT "FK_9b015533f0f76f41cf89b01dd9c"`);
        await queryRunner.query(`ALTER TABLE "elder" DROP CONSTRAINT "FK_a9086479a977fdb3d7b925cae01"`);
        await queryRunner.query(`ALTER TABLE "elder" DROP CONSTRAINT "FK_e51f466408b724dd60de020417c"`);
        await queryRunner.query(`DROP TABLE "responsible"`);
        await queryRunner.query(`DROP TYPE "public"."responsible_kinship_enum"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "caregiver"`);
        await queryRunner.query(`DROP TABLE "proposal"`);
        await queryRunner.query(`DROP TYPE "public"."proposal_status_enum"`);
        await queryRunner.query(`DROP TABLE "elder"`);
    }

}
