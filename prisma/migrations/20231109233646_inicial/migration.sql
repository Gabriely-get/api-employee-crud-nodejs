/*
  Warnings:

  - You are about to alter the column `dataInicio` on the `projetos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataFim` on the `projetos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `projetos` MODIFY `dataInicio` DATETIME NOT NULL,
    MODIFY `dataFim` DATETIME NOT NULL;
