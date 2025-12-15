PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_api_limit` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user_api_limit`("id", "user_id", "count", "created_at", "updated_at") SELECT "id", "user_id", "count", "created_at", "updated_at" FROM `user_api_limit`;--> statement-breakpoint
DROP TABLE `user_api_limit`;--> statement-breakpoint
ALTER TABLE `__new_user_api_limit` RENAME TO `user_api_limit`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `user_api_limit_user_id_unique` ON `user_api_limit` (`user_id`);