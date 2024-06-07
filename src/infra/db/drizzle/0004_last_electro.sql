CREATE TABLE `permissionsRoles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pid` varchar(191) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`roleId` int,
	`permissionId` int,
	CONSTRAINT `permissionsRoles_id` PRIMARY KEY(`id`)
);
