import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),

  accountId: uuid("account_id").defaultRandom().notNull(),
  providerId: uuid("provider_id").defaultRandom().notNull(),

  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),

  idToken: text("id_token"),

  scope: text("scope"),
  password: text("password"),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
