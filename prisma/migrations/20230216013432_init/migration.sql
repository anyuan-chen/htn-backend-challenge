/*
  Warnings:

  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `skill` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "skill" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "user_uid" INTEGER NOT NULL,
    CONSTRAINT "Skill_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("rating", "user_uid") SELECT "rating", "user_uid" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
