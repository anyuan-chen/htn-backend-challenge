/*
  Warnings:

  - Added the required column `rating` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "user_uid" INTEGER NOT NULL,
    CONSTRAINT "Skill_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("name", "user_uid") SELECT "name", "user_uid" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
