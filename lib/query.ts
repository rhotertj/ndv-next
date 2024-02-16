import prisma from "@/lib/database";
import { validatedQueryParams} from "@/types/query";

function seasonYearToDatabaseFormat(year: any) {
  if (year === undefined) {
    return undefined
  }
  return new Date(`${year}-08-01`).toISOString().substring(0, 19)
}

export async function fetchCompetitionFilterOptions(
  params: validatedQueryParams,
) {
  const competitions = await prisma.competition.findMany({
    select: { name: true },
    where: {
      year: {
        equals: seasonYearToDatabaseFormat(params.season)
      },
      Teammatch: {
        some: {
          OR: [
            {
              Team_Teammatch_away_teamToTeam: {
                Club: {
                  name: params.club,
                },
              },
            },
            {
              Team_Teammatch_home_teamToTeam: {
                Club: {
                  name: params.club,
                },
              },
            },
          ],
        },
      },
    },
    orderBy: { name: "asc" },
  });
  return competitions;
}

export async function fetchClubFilterOptions(params: validatedQueryParams) {
  const clubs = await prisma.club.findMany({
    where: {
      Team: {
        some: {
          OR: [
            {
              Teammatch_Teammatch_away_teamToTeam: {
                some: {
                  Competition: {
                    name: params.competition,
                    year: seasonYearToDatabaseFormat(params.season)
                  },
                },
              },
            },
            {
              Teammatch_Teammatch_home_teamToTeam: {
                some: {
                  Competition: {
                    name: params.competition,
                    year: seasonYearToDatabaseFormat(params.season)
                  },
                },
              },
            },
          ],
        },
      },
    },
    orderBy: { name: "asc" },
  });
  return clubs;
}

export async function fetchSeasonFilterOptions(params: validatedQueryParams) {
  const seasons = await prisma.competition.findMany({
    select: { year: true },
    distinct: ["year"],
    where: {
      name: params.competition,
      Player: {
        some: {
          Club: {
            name: params.club
          }
        }
      }
    }
  });
  return seasons;
}

export async function fetchPlayerRatingsList(params: validatedQueryParams) {
  const ratings = prisma.skillrating.findMany({
    where: {
      Player: {
        Human: {
          name: {
            startsWith: params.name,
          },
        },
        Club: {
          name: params.club,
        },
      },
      Competition: {
        name: params.competition,
        year: seasonYearToDatabaseFormat(params.season)
      },
    },
    orderBy: { rating_mu: "desc" },
    select: {
      rating_mu: true,
      rating_sigma: true,
      Competition: {
        select: {
          name: true,
        },
      },
      Player: {
        select: {
          Club: {
            select: {
              name: true,
            },
          },
          Human: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return ratings;
}
