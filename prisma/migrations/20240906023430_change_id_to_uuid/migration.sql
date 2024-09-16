/*
  Warnings:

  - The primary key for the `companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `companies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_company_id_fkey";

-- AlterTable
ALTER TABLE "companies"
  ALTER COLUMN id TYPE UUID USING id::UUID;

-- AlterTable
ALTER TABLE "users"
  ALTER COLUMN id TYPE UUID USING id::UUID,
  ALTER COLUMN company_id TYPE UUID USING company_id::UUID,
  -- AddForeignKey
  ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;





