/*
  Warnings:

  - You are about to drop the `Favorites` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_albumsId_fkey";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_tracksId_fkey";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_userId_fkey";

-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "grammy" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Favorites";

-- CreateTable
CREATE TABLE "FavArtist" (
    "artistId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavAlbum" (
    "albumId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavTrack" (
    "trackId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavArtist_artistId_key" ON "FavArtist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "FavAlbum_albumId_key" ON "FavAlbum"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavTrack_trackId_key" ON "FavTrack"("trackId");

-- AddForeignKey
ALTER TABLE "FavArtist" ADD CONSTRAINT "FavArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavAlbum" ADD CONSTRAINT "FavAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavTrack" ADD CONSTRAINT "FavTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
