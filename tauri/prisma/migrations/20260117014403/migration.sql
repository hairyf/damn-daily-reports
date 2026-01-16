-- Drop and recreate record and report tables
-- This will delete all data in these tables

-- Drop record table
DROP TABLE IF EXISTS "record";

-- Drop report table  
DROP TABLE IF EXISTS "report";

-- Recreate record table with sourceId
CREATE TABLE "record" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "summary" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "sourceId" TEXT NOT NULL,
    CONSTRAINT "record_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "source" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Recreate report table
CREATE TABLE "report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

