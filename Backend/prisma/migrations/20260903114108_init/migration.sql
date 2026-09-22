-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tmdbId" INTEGER,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "posterPath" TEXT,
    "releaseYear" INTEGER,
    "personalRating" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
