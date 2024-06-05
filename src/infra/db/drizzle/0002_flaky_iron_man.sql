CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pid` varchar(191) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`name` varchar(191),
	`description` varchar(191),
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
