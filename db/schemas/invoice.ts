import {
  pgTable,
  uuid,
  text,
  numeric,
  date,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { categories } from "./category";

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  value: numeric("value", { precision: 10, scale: 2 }).notNull(),
  dueDate: date("due_date").notNull(),
  isPaid: boolean("is_paid").default(false),
  paidAt: timestamp("paid_at"),
  recurrence: text("recurrence").default("none"), // monthly, yearly, none

  categoryId: uuid("category_id").references(() => categories.id),
  userId: uuid("user_id").references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
