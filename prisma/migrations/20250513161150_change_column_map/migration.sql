/*
  Warnings:

  - You are about to drop the column `baseSalary` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `joinedAt` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `base_salary` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "joined_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "base_salary" REAL NOT NULL,
    "supervisor_id" TEXT,
    CONSTRAINT "Staff_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("id", "name", "supervisor_id", "type") SELECT "id", "name", "supervisor_id", "type" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
