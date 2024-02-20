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
    distinct: ['name'],
    where: {
      year: {
        equals: seasonYearToDatabaseFormat(params.season)
      },
      Team: {
        some: {
            rank: params.rank,
            Club: {
              name: params.club,
              },
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
          rank: params.rank,
          year: seasonYearToDatabaseFormat(params.season),
          Competition: {
            name: params.competition
          }
        },
      },
    },
    orderBy: { name: "asc" },
    distinct: ['name'],
    select: { 
       name: true,
        Team: {
          select: {
            rank: true
          }
    }}
  });
  return clubs;
}
// todo include rank options in other filters
export async function fetchRankFilterOptions(params: validatedQueryParams) {
  const ranks = await prisma.team.findMany({
    where: {
        Club: {
          name: params.club
        },
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
    orderBy: { rank: "asc" },
    distinct: ['rank']
  });
  return ranks;
}

export async function fetchSeasonFilterOptions(params: validatedQueryParams) {
  const seasons = await prisma.competition.findMany({
    select: { year: true },
    distinct: ["year"],
    where: {
      name: params.competition,
      Team: {
        some: {
          Club: {
            name: params.club,
            Team: {
              some: {
                rank: params.rank
              }
            }
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
          name: params.club
        },
      },
      Team: {
        Competition: {name: params.competition},
        rank: params.rank,
        year: seasonYearToDatabaseFormat(params.season),
      },
    },
    orderBy: { rating_mu: "desc" },
    select: {
      rating_mu: true,
      rating_sigma: true,
      Team: {
        select: {
          Competition: {
            select: {
              name: true,
              year: true
            },
          }
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
