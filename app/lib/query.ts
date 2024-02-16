import prisma from "./database";

export class validatedQueryParams {
  _competition: string;
  _season: number;
  _club: string;
  _name: string;

  constructor(searchParams: any) {
    this._competition = searchParams?.Wettbewerb;
    this._season = searchParams?.Saison;
    this._name = searchParams?.Name;
    this._club = searchParams?.Verein;
  }

  get name() {
    if (this._name === null) {
      return undefined;
    }
    return this._name;
  }

  get competition() {
    if (this._competition === null) {
      return undefined;
    }
    return this._competition;
  }

  get club() {
    if (this._club === null) {
      return undefined;
    }
    return this._club;
  }

  get season() {
    if (this._season === null) {
      return undefined;
    }
    return this._season;
  }
}

// where: { year: { equals: new Date(`${filters.season}-08-01`)} },
export async function fetchCompetitionFilterOptions(
  params: validatedQueryParams,
) {
  const competitions = await prisma.competition.findMany({
    select: { name: true },
    where: {
      Teammatch: {
        some: {
          OR: [
            {
              Team_Teammatch_away_teamToTeam: {
                Club: {
                  name: params.club
                }
              },
            },
            {
              Team_Teammatch_home_teamToTeam: {
                Club: {
                  name: params.club
                }
              },
            }
          ]
        }
      }
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
                    name:  params.competition
                  }
                }
              },
            },
            {
              Teammatch_Teammatch_home_teamToTeam: {
                some: {
                  Competition: {
                    name:  params.competition
                  }
                }
              },
            }
          ]
        },
      },
    },
    orderBy: { name: "asc" },
  });
  return clubs;
}

export async function fetchSeasonFilterOptions(params: validatedQueryParams) {
  const seasons = await prisma.competition.findMany({select: {year : true}});
  return seasons;
  return [
    { id: 0, name: 2022 },
    { id: 1, name: 2023 },
  ];
}

export async function fetchPlayerRatingsList(params: validatedQueryParams) {
  const ratings = prisma.skillrating.findMany({
    where: {
      Player: {
        Human: {
          name: {
            startsWith: params.name
          }
        },
        Club: {
          name: params.club
        }
      },
      Competition: {
        name: params.competition
      }
    },
    orderBy: {rating_mu: 'desc'},
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
              id: true
            },
          },
        },
      },
    },
  });
  return ratings;
}
