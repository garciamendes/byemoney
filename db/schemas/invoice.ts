import {
  pgTable,
  uuid,
  text,
  numeric,
  date,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { categories } from "./category";

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  value: numeric("value", { precision: 10, scale: 2 }).notNull(),
  dueDate: date("due_date").notNull(),
  paidAt: timestamp("paid_at"),
  recurrence: text("recurrence").default("none"), // weenkly, monthly, yearly, none
  installments: integer("installments").default(1),

  userId: uuid("user_id").references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const categoriesToInvoices = pgTable("categoriesToInvoices", {
  invoice_id: uuid("invoice_id")
    .notNull()
    .references(() => invoices.id),
  category_id: uuid("category_id")
    .notNull()
    .references(() => categories.id),
});
