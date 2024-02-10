-- CreateTable
CREATE TABLE "club_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "competition_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "association" TEXT,
    "year" DATETIME
);

-- CreateTable
CREATE TABLE "doublesmatch_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team_match" INTEGER,
    "home_player1" INTEGER,
    "home_player2" INTEGER,
    "away_player1" INTEGER,
    "away_player2" INTEGER,
    "result" TEXT,
    "match_number" INTEGER,
    CONSTRAINT "doublesmatch_table_away_player2_fkey" FOREIGN KEY ("away_player2") REFERENCES "player_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "doublesmatch_table_away_player1_fkey" FOREIGN KEY ("away_player1") REFERENCES "player_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "doublesmatch_table_home_player2_fkey" FOREIGN KEY ("home_player2") REFERENCES "player_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "doublesmatch_table_home_player1_fkey" FOREIGN KEY ("home_player1") REFERENCES "player_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "doublesmatch_table_team_match_fkey" FOREIGN KEY ("team_match") REFERENCES "teammatch_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "human_table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "player_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "human" TEXT,
    "club" INTEGER,
    "association_id" TEXT,
    CONSTRAINT "player_table_club_fkey" FOREIGN KEY ("club") REFERENCES "club_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "player_table_human_fkey" FOREIGN KEY ("human") REFERENCES "human_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "singlesmatch_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team_match" INTEGER,
    "home_player" INTEGER,
    "away_player" INTEGER,
    "result" TEXT,
    "match_number" INTEGER,
    CONSTRAINT "singlesmatch_table_away_player_fkey" FOREIGN KEY ("away_player") REFERENCES "player_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "singlesmatch_table_home_player_fkey" FOREIGN KEY ("home_player") REFERENCES "player_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "singlesmatch_table_team_match_fkey" FOREIGN KEY ("team_match") REFERENCES "teammatch_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "skillrating_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player" INTEGER,
    "competition" INTEGER,
    "rating_mu" REAL,
    "rating_sigma" REAL,
    "latest_update" DATETIME,
    CONSTRAINT "skillrating_table_competition_fkey" FOREIGN KEY ("competition") REFERENCES "competition_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "skillrating_table_player_fkey" FOREIGN KEY ("player") REFERENCES "player_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "team_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rank" TEXT,
    "club" INTEGER,
    "year" DATETIME,
    CONSTRAINT "team_table_club_fkey" FOREIGN KEY ("club") REFERENCES "club_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "teammatch_table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME,
    "competition" INTEGER,
    "result" TEXT,
    "home_team" INTEGER,
    "away_team" INTEGER,
    "used_for_rating" BOOLEAN,
    CONSTRAINT "teammatch_table_away_team_fkey" FOREIGN KEY ("away_team") REFERENCES "team_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "teammatch_table_home_team_fkey" FOREIGN KEY ("home_team") REFERENCES "team_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "teammatch_table_competition_fkey" FOREIGN KEY ("competition") REFERENCES "competition_table" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_club_table_1" ON "club_table"("name");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_player_table_1" ON "player_table"("id");
Pragma writable_schema=0;

