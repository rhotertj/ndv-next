import prisma from "./database";

export class PlayerRating {
  readonly playerName: string;
  readonly humanID: string;
  readonly ratingMu: number;
  readonly ratingSigma: number;
  readonly competitionName: string;
  readonly clubName: string;

  constructor(queryResult: any) {
    this.humanID = queryResult.Player.Human.id;
    this.playerName = queryResult.Player.Human.name;
    this.ratingMu = queryResult.rating_mu;
    this.ratingSigma = queryResult.rating_sigma;
    this.competitionName = queryResult.Competition.name;
    this.clubName = queryResult.Player.Club.name;
  }

  conservativeRating(factor=3) {
    return this.ratingMu - (factor * this.ratingSigma)
  }
}

export async function fetchPlayerRatings(humanID: string) {
  const ratings = prisma.skillrating.findMany({
    where: {
      Player: {
        human: humanID,
      },
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
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return ratings;
}

export class SinglesMatch {
  readonly homePlayer: string;
  readonly awayPlayer: string;
  readonly result: string;
  readonly date: undefined;

  constructor(match: any) {
    // make sure before that we pass single and not double
    this.homePlayer = match.player_table_singlesmatch_table_home_playerToplayer_table.human_table.name
    this.awayPlayer = match.player_table_singlesmatch_table_away_playerToplayer_table.human_table.name
    this.result = match.result;
    this.date = undefined;
  }
}

export class DoublesMatch {
  readonly homePlayer1: string;
  readonly homePlayer2: string;
  readonly awayPlayer1: string;
  readonly awayPlayer2: string;
  readonly result: string;
  readonly date: undefined;

  constructor(match: any) {
    // make sure before that we pass single and not double
    this.homePlayer1 = match.player_table_doublesmatch_table_home_player1Toplayer_table.human_table.name
    this.homePlayer2 = match.player_table_doublesmatch_table_home_player2Toplayer_table.human_table.name
    this.awayPlayer1 = match.player_table_doublesmatch_table_away_player1Toplayer_table.human_table.name
    this.awayPlayer2 = match.player_table_doublesmatch_table_away_player2Toplayer_table.human_table.name
    this.result = match.result;
    this.date = undefined;
  }
}
// fetch last singles
// fetch last doubles
export async function fetchHumanLastSingles(humanID: string) {
  const matches = prisma.singlesmatch.findMany({
    select: {
      id: true,
      result: true,
      Player_Singlesmatch_away_playerToPlayer: {
        select: {
            Human: {
                select: {
                    name: true
                }
            }
        }
      },
      Player_Singlesmatch_home_playerToPlayer: {
        select: {
            Human: {
                select: {
                    name: true
                }
            }
        }
      },
    },
    where: {
        OR: [
          {
            Player_Singlesmatch_home_playerToPlayer: {
              human: humanID,
            },
          },
          {
            Player_Singlesmatch_away_playerToPlayer: {
              human: humanID,
            },
          },
        ],
      },
  })
  return matches;
}


export async function fetchPlayerLastGames(humanID: string) {
  // we can later also return the date - when prisma gets it done ;)
  //  TODO We are now selecting every teammatch and all the games if our human has been part in at least one game!!
  const games = prisma.teammatch.findMany({
    select: {
      Singlesmatch: {
        select: {
          Player_Singlesmatch_away_playerToPlayer: {
            select: {
                Human: {
                    select: {
                        name: true
                    }
                }
            }
          },
          Player_Singlesmatch_home_playerToPlayer: {
            select: {
                Human: {
                    select: {
                        name: true
                    }
                }
            }
          },
          result: true,
        },
      },
      Doublesmatch: {
        select: {
          Player_Doublesmatch_home_player1ToPlayer: {
            select: {
                Human: {
                    select: {
                        name: true
                    }
                }
            }
        },
        Player_Doublesmatch_home_player2ToPlayer : {
            select: {
                Human: {
                    select: {
                        name: true
                    }
                }
            }
        },
          Player_Doublesmatch_away_player1ToPlayer: {
            select: {
                Human: {
                    select: {
                        name: true
                    }
                }
            }
        },
        Player_Doublesmatch_away_player2ToPlayer: {
            select: {
                Human: {
                    select: {
                        name: true
                    }
                }
            }
        },
          result: true,
        },
      },
    },
    where: {
      Singlesmatch: {
        some: {
          OR: [
            {
              Player_Singlesmatch_home_playerToPlayer: {
                human: humanID,
              },
            },
            {
              Player_Singlesmatch_away_playerToPlayer: {
                human: humanID,
              },
            },
          ],
        },
      },
      Doublesmatch: {
        some: {
          OR: [
            {
              Player_Doublesmatch_away_player1ToPlayer: {
                human: humanID,
              },
            },
            {
              Player_Doublesmatch_away_player2ToPlayer: {
                human: humanID,
              },
            },
            {
              Player_Doublesmatch_home_player1ToPlayer: {
                human: humanID,
              },
            },
            {
              Player_Doublesmatch_home_player2ToPlayer: {
                human: humanID,
              },
            },
          ],
        },
      },
    },
  });
  return games;
}
