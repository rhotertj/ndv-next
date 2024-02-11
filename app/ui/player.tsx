import Link from "next/link";

export type PlayerType = {
  id: string;
  name: string;
  player_table: [
    {
      id: number;
      human: string;
      club: number;
      association_id: string;
      club_table: {
        name: string;
      };
      skillrating_table: [{ rating_mu: number; rating_sigma: number }];
    },
  ];
};

// TODO Write player class that parses the info from the database and also provides helper funcs like conservative rating

export function conservativeRating(player: PlayerType) {
  const mu = player.player_table[0].skillrating_table[0]?.rating_mu.toFixed(2) || '25.00';
  const sigma = player.player_table[0].skillrating_table[0]?.rating_sigma.toFixed(2) || '8.33';
  return Number(mu) - 3* Number(sigma);
}

export function PlayerListEntry({
  index,
  player,
}: {
  index: number;
  player: any;
}) {
  const rating_mu: string =
    player.player_table[0].skillrating_table[0]?.rating_mu.toFixed(2) || '25.00';
  const rating_sigma: string =
    player.player_table[0].skillrating_table[0]?.rating_sigma.toFixed(2) || '8.33';
  return (
    <Link key={player.id} href={`/players/${player.id}`}>
      <div className="flex player-container border border-solid rounded-md mb-1 min-w-fit lg:min-w-[650px] max-w-screen-lg">
        <div className="player-indicator w-2"></div>
        <div className="flex-col self-center my-2 mx-4">{index + 1}.</div>
        <div className="flex flex-col my-3 mr-4">
          <div className="flex">
            <p className="text-lg font-bold mb-2 mr-2">{player.name}</p>
            {/* <div className="badge badge-primary badge-outline mt-0.5">
                            ⭐TODO: This can display bades with info text when we actually have the data
                        </div> */}
          </div>
          <p className="italic">{player.player_table[0].club_table.name}</p>
        </div>
        <div className="flex flex-col ml-auto mr-8 self-center">
          <p className="mt-2">
            r=
            <span className="text-2xl font-bold italic">
              {conservativeRating(player).toFixed(2)}
            </span>
          </p>
        </div>
        <div className="flex flex-col ml-6 mr-6 self-center">
          <p className="m-1">
            μ= <span>{rating_mu}</span>
          </p>
          <p className="m-1">
            σ= <span>{rating_sigma}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
