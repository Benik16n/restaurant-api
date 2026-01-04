import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 120 }).unique().notNull(),
  password: varchar("password", { length: 50 }).notNull(),

  firstname: varchar("firstname", { length: 50 }),
  lastname: varchar("lastname", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const restaurants = pgTable("restaurants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),

  activeMenuId: uuid("active_menu_id").references(() => menus.id, {
    onDelete: "cascade",
  }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const menus = pgTable("menus", {
  id: uuid("id").primaryKey().defaultRandom(),
  restaurantId: uuid("restaurant_id").references(() => restaurants.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const dishes = pgTable("dishes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  ingredients: text("ingredients").notNull(),
  allergies: text("allergies"),
  type: varchar("type", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  restaurantId: uuid("restaurant_id")
    .references(() => restaurants.id, { onDelete: "cascade" })
    .notNull(),
  review: integer("review").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const menuDishes = pgTable("menu_dishes", {
  menuId: uuid("menu_id").references(() => menus.id, { onDelete: "cascade" }),
  dishId: uuid("dish_id").references(() => dishes.id, { onDelete: "cascade" }),
});
export const userRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
}));

export const restaurantRelations = relations(restaurants, ({ one, many }) => ({
  menus: many(menus),
  activeMenus: one(menus, {
    fields: [restaurants.activeMenuId],
    references: [menus.id],
  }),
  reviews: many(reviews),
}));

export const menuRelations = relations(menus, ({ one, many }) => ({
  dishes: many(dishes),
  restaurants: one(restaurants, {
    fields: [menus.restaurantId],
    references: [restaurants.id],
  }),
}));

export const dishesRelations = relations(dishes, ({ many }) => ({
  menus: many(menus),
}));

export const reviewRelations = relations(reviews, ({ one }) => ({
  restaurants: one(restaurants, {
    fields: [reviews.restaurantId],
    references: [restaurants.id],
  }),
  users: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const menuDishRelations = relations(menuDishes, ({ one }) => ({
  menus: one(menus, {
    fields: [menuDishes.menuId],
    references: [menus.id],
  }),
  dishes: one(dishes, {
    fields: [menuDishes.dishId],
    references: [dishes.id],
  }),
}));

export const User = users.$inferSelect;
export const NewUser = users.$inferInsert;
export const Restaurant = restaurants.$inferSelect;
export const NewRestaurant = restaurants.$inferInsert;
export const Menu = menus.$inferSelect;
export const NewMenu = menus.$inferInsert;
export const Dish = dishes.$inferSelect;
export const NewDish = dishes.$inferInsert;
export const Review = reviews.$inferSelect;
export const NewReview = reviews.$inferInsert;
