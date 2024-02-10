import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// we need to query with filter states as arguments, requery when states change (done in respective components)
// use for suspense testing
function Sleep(milliseconds : number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

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

// we need a way to encode "true" as in "all allowed" / no filter set
// use null, use react useState to change current filterstates per event
export type filterStatesType = {
    competition: string,
    season: number,
    club: string
}
export async function fetchCompetitions(filters : filterStatesType) {
    const competitions = await prisma.competition_table.findMany({
        where: {
            name: "Kreisliga 9",
        }
    })
}

export async function fetchUnfilteredPlayerWithRatings() {
    const allHumans = await prisma.human_table.findMany();
    console.log(allHumans);
    }

