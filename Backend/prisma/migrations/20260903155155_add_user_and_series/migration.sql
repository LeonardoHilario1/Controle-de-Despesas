/*
  Warnings:

  - Added the required column `userId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tmdbId" INTEGER,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "posterPath" TEXT,
    "releaseYear" INTEGER,
    "totalSeasons" INTEGER,
    "personalRating" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Series_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tmdbId" INTEGER,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "posterPath" TEXT,
    "releaseYear" INTEGER,
    "personalRating" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("createdAt", "id", "overview", "personalRating", "posterPath", "releaseYear", "title", "tmdbId") SELECT "createdAt", "id", "overview", "personalRating", "posterPath", "releaseYear", "title", "tmdbId" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
