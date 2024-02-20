import Link from "next/link";
import { PlayerRating } from "@/types/player";

export function PlayerListEntry({
  index,
  player,
}: {
  index: number;
  player: PlayerRating;
}) {
  // target="_blank"
  return (
    <Link key={`${player.humanID}-${player.competitionName}-${player.ratingMu}`} href={`/players/${player.humanID}`} >
      <div className="flex player-container border border-solid rounded-md mb-1 min-w-fit lg:min-w-[650px] max-w-screen-lg">
        <div className="player-indicator w-2"></div>
        <div className="flex-col self-center my-2 mx-4">{index + 1}.</div>
        <div className="flex flex-col my-3 mr-4">
          <div className="flex">
            <p className="text-lg font-bold mb-2 mr-2">{player.playerName}</p>
            {/* <div className="badge badge-primary badge-outline mt-0.5">
                ⭐TODO: This can display bades with info text when we actually have the data
            </div> */}
          </div>
          <p className="italic">{player.clubName}</p>
        </div>
        <div className="flex flex-col ml-auto mr-8 self-center">
          <p className="mt-2">
            r=
            <span className="text-2xl font-bold italic">
              {player.conservativeRating().toFixed(2)}
            </span>
          </p>
        </div>
        <div className="flex flex-col ml-6 mr-6 self-center">
          <p className="m-1">
            μ= <span>{player.ratingMu.toFixed(2)}</span>
          </p>
          <p className="m-1">
            σ= <span>{player.ratingSigma.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}


export function RatingCard({rating}: {rating: PlayerRating}){
  return (
    <div className="card max-w-96 border-primary border-dotted shadow-xl">
      <div className="card-body">
            <h2 className="card-title text-3xl flex justify-center">{rating.ratingMu.toFixed(2)}</h2>
          <div className="flex gap-x-2.5 mx-4 flex-wrap">
            <p>{rating.competitionName}</p><p>{rating.clubName}</p>
          </div>
          <p className="flex justify-center font-bold">{rating.year}</p>
      </div>
    </div>
  )
}

export function PlayerDetailView({humanID}: {humanID: string}){
  return (
    <div>
        {humanID}
    </div>
  )
}
