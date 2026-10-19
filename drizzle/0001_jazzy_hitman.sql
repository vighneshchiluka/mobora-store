CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `order_events` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`status` text NOT NULL,
	`note` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`request_key` text NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`address` text NOT NULL,
	`items` text NOT NULL,
	`subtotal` integer NOT NULL,
	`shipping` integer NOT NULL,
	`amount` integer NOT NULL,
	`status` text NOT NULL,
	`payment_status` text NOT NULL,
	`gateway_order` text,
	`payment_id` text,
	`tracking` text DEFAULT '' NOT NULL,
	`carrier` text DEFAULT '' NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_request` ON `orders` (`user_id`,`request_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `orders_gateway` ON `orders` (`gateway_order`);--> statement-breakpoint
CREATE UNIQUE INDEX `orders_payment` ON `orders` (`payment_id`);--> statement-breakpoint
CREATE INDEX `orders_customer` ON `orders` (`user_id`);--> statement-breakpoint
CREATE TABLE `wishlist` (
	`user_id` text NOT NULL,
	`product_id` text NOT NULL,
	`created` text NOT NULL,
	PRIMARY KEY(`user_id`, `product_id`)
);
