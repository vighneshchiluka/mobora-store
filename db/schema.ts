import {sqliteTable,text} from 'drizzle-orm/sqlite-core';
export const enquiries=sqliteTable('enquiries',{id:text('id').primaryKey(),name:text('name').notNull(),email:text('email').notNull(),pincode:text('pincode').notNull(),items:text('items').notNull(),created:text('created').notNull()});
