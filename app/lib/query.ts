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
  const competitions = await prisma.competition_table.findMany({
    select: { name: true },
    where: {
      teammatch_table: {
        some: {
          OR: [
            {
              team_table_teammatch_table_away_teamToteam_table: {
                club_table: {
                  name: params.club
                }
              },
            },
            {
              team_table_teammatch_table_home_teamToteam_table: {
                club_table: {
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
  const clubs = await prisma.club_table.findMany({
    where: {
      team_table: {
        some: {
          OR: [
            {
              teammatch_table_teammatch_table_away_teamToteam_table: {
                some: {
                  competition_table: {
                    name:  params.competition
                  }
                }
              },
            },
            {
              teammatch_table_teammatch_table_home_teamToteam_table: {
                some: {
                  competition_table: {
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
  // const seasons = await prisma.competition_table.findMany({select: {year : true}});
  //   return seasons;
  return [
    { id: 0, name: 2022 },
    { id: 1, name: 2023 },
  ];
}
export async function fetchPlayers(params: validatedQueryParams) {
  // need player_id for respective human_id for club_id and skillrating
  let whereConditionName: any = {};
  if (params.name !== undefined) {
    whereConditionName["name"] = { startsWith: params.name };
  }
  let whereConditionClub: any = {};
  if (params.club !== undefined) {
    whereConditionClub["name"] = { equals: params.club };
  }
  console.log(params, whereConditionClub);
  // Player where playerid is in home or away player in a match that links to a teammatch in a competition we filter
  const allHumans = await prisma.human_table.findMany({
    where: {
      name: {
        startsWith: params.name,
      },
      player_table: {
        some: {
          club_table: {
            name: params.club,
          },
          OR: [
            {
              singlesmatch_table_singlesmatch_table_away_playerToplayer_table: {
                some: {
                  teammatch_table: {
                    competition_table: {
                      name: params.competition,
                    },
                  },
                },
              },
            },
            {
              singlesmatch_table_singlesmatch_table_home_playerToplayer_table: {
                some: {
                  teammatch_table: {
                    competition_table: {
                      name: params.competition,
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
    select: {
      id: true,
      name: true,
      player_table: {
        select: {
          club_table: {
            select: {
              name: true,
            },
          },
          skillrating_table: {
            select: {
              rating_mu: true,
              rating_sigma: true,
            },
          },
        },
      },
    },
  });
  return allHumans;
}
