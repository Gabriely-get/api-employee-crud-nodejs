-- CreateTable
CREATE TABLE `funcionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` DECIMAL(65, 30) NOT NULL,
    `cargo` VARCHAR(100) NOT NULL,
    `salario` DECIMAL(12, 2) NOT NULL,
    `departamentoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `funcionarios_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `localizacao` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `departamentos_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projetos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `dataInicio` DATETIME NOT NULL,
    `dataFim` DATETIME NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `projetos_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FuncionarioToProjeto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FuncionarioToProjeto_AB_unique`(`A`, `B`),
    INDEX `_FuncionarioToProjeto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `funcionarios_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `departamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FuncionarioToProjeto` ADD CONSTRAINT `_FuncionarioToProjeto_A_fkey` FOREIGN KEY (`A`) REFERENCES `funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FuncionarioToProjeto` ADD CONSTRAINT `_FuncionarioToProjeto_B_fkey` FOREIGN KEY (`B`) REFERENCES `projetos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
