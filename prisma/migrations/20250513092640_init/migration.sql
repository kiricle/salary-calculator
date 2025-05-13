-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "supervisor_id" TEXT,
    CONSTRAINT "Staff_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
