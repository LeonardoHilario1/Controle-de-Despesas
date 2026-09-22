/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Movie";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Series";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "WatchedItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "tmdbId" INTEGER,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "posterPath" TEXT,
    "releaseYear" INTEGER,
    "personalRating" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "WatchedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
