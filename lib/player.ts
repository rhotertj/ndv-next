import prisma from "@/lib/database";

export async function fetchPlayerRatings(humanID: string) {
  const ratings = prisma.skillrating.findMany({
    where: {
      Player: {
        human: humanID,
      },
    },
    orderBy: {
      Team: {
        year: 'desc'
      }
    },
    select: {
      rating_mu: true,
      rating_sigma: true,
      Team: {
        select: {
          Competition: {
            select: {
              name: true,
              year: true
            }
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
      Teammatch: {
        select: {
          date: true
        }
      }
    },
    // orderBy: {
    //   Teammatch: {
    //     date: ["desc"]
    //   }
    // },
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


export async function fetchHumanLastDoubles(humanID: string) {
  const games = prisma.doublesmatch.findMany({
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
          Teammatch: {
            select: {
              date: true
            }
          }
        },
    where: {
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
  });
  return games;
}