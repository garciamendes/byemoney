ALTER TABLE "accounts" ALTER COLUMN "account_id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "provider_id" SET DEFAULT gen_random_uuid();