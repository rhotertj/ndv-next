import prisma from "@/lib/database";

export type metaDataType = {
  players: number;
  matches: number;
  competitions: number;
};

export async function fetchMetaData() {
  const nPlayers = await prisma.human.count();
  const nSingles = await prisma.singlesmatch.count();
  const nDoubles = await prisma.doublesmatch.count();
  const nCompetitions = await prisma.competition.count();
  await Promise.all([nPlayers, nDoubles, nSingles, nCompetitions]);
  const data = {
    players: nPlayers,
    matches: nSingles + nDoubles,
    competitions: nCompetitions,
  };
  return data;
}

export async function fetchLastUpdate() {
  const lastUpdate = await prisma.skillrating.aggregate({
    _max: {
      latest_update: true,
    },
  });
  return lastUpdate._max.latest_update;
}
