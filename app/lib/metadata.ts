import prisma from "./database";

export type metaDataType = {
    players: number;
    matches: number;
    competitions: number;
  };
  
  export async function fetchMetaData() {
    const nPlayers = await prisma.player_table.count();
    const nSingles = await prisma.singlesmatch_table.count();
    const nDoubles = await prisma.doublesmatch_table.count();
    const nCompetitions = await prisma.competition_table.count();
    await Promise.all([nPlayers, nDoubles, nSingles, nCompetitions]);
    const data = {
      players: nPlayers,
      matches: nSingles + nDoubles,
      competitions: nCompetitions,
    };
    return data;
  }