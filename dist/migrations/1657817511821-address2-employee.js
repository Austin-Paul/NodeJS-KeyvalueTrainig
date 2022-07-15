"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.address2Employee1657817511821 = void 0;
class address2Employee1657817511821 {
    constructor() {
        this.name = 'address2Employee1657817511821';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zip"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "district"`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "deleted_at" TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "address" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "address_id" integer`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "deleted_at"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "created_at"`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "district" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "zip" integer NOT NULL`);
        });
    }
}
exports.address2Employee1657817511821 = address2Employee1657817511821;
//# sourceMappingURL=1657817511821-address2-employee.js.map