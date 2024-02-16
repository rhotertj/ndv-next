import prisma from "./database";

export type metaDataType = {
    players: number;
    matches: number;
    competitions: number;
  };
  
  export async function fetchMetaData() {
    const nPlayers = await prisma.player.count();
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