-- CreateTable
CREATE TABLE "Club" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "association" TEXT,
    "year" TEXT
);

-- CreateTable
CREATE TABLE "Doublesmatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team_match" INTEGER,
    "home_player1" INTEGER,
    "home_player2" INTEGER,
    "away_player1" INTEGER,
    "away_player2" INTEGER,
    "result" TEXT,
    "match_number" INTEGER,
    CONSTRAINT "Doublesmatch_away_player2_fkey" FOREIGN KEY ("away_player2") REFERENCES "Player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Doublesmatch_away_player1_fkey" FOREIGN KEY ("away_player1") REFERENCES "Player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Doublesmatch_home_player2_fkey" FOREIGN KEY ("home_player2") REFERENCES "Player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Doublesmatch_home_player1_fkey" FOREIGN KEY ("home_player1") REFERENCES "Player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Doublesmatch_team_match_fkey" FOREIGN KEY ("team_match") REFERENCES "Teammatch" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Human" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "human" TEXT,
    "club" INTEGER,
    "association_id" TEXT,
    "default_competition" INTEGER,
    CONSTRAINT "Player_default_competition_fkey" FOREIGN KEY ("default_competition") REFERENCES "Competition" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Player_club_fkey" FOREIGN KEY ("club") REFERENCES "Club" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Player_human_fkey" FOREIGN KEY ("human") REFERENCES "Human" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Singlesmatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team_match" INTEGER,
    "home_player" INTEGER,
    "away_player" INTEGER,
    "result" TEXT,
    "match_number" INTEGER,
    CONSTRAINT "Singlesmatch_away_player_fkey" FOREIGN KEY ("away_player") REFERENCES "Player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Singlesmatch_home_player_fkey" FOREIGN KEY ("home_player") REFERENCES "Player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Singlesmatch_team_match_fkey" FOREIGN KEY ("team_match") REFERENCES "Teammatch" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Skillrating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player" INTEGER,
    "competition" INTEGER,
    "rating_mu" REAL,
    "rating_sigma" REAL,
    "latest_update" TEXT,
    CONSTRAINT "Skillrating_competition_fkey" FOREIGN KEY ("competition") REFERENCES "Competition" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Skillrating_player_fkey" FOREIGN KEY ("player") REFERENCES "Player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rank" TEXT,
    "club" INTEGER,
    "year" TEXT,
    CONSTRAINT "Team_club_fkey" FOREIGN KEY ("club") REFERENCES "Club" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Teammatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT,
    "competition" INTEGER,
    "result" TEXT,
    "home_team" INTEGER,
    "away_team" INTEGER,
    "used_for_rating" BOOLEAN,
    CONSTRAINT "Teammatch_away_team_fkey" FOREIGN KEY ("away_team") REFERENCES "Team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Teammatch_home_team_fkey" FOREIGN KEY ("home_team") REFERENCES "Team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Teammatch_competition_fkey" FOREIGN KEY ("competition") REFERENCES "Competition" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Club_1" ON "Club"("name");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Player_1" ON "Player"("id");
Pragma writable_schema=0;

-- CreateIndex
CREATE INDEX "ix_Player_human" ON "Player"("human");

