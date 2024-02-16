/* trunk-ignore-all(prettier) */
import { Footer } from "./ui/footer";
import { PlayerListEntry } from "./ui/player";
import { Filter } from "./ui/filter";
import { Search } from "./ui/search";
import { GeneralStats } from "./ui/stats";
import { Suspense } from "react";
import {
  fetchClubFilterOptions,
  fetchCompetitionFilterOptions,
  fetchPlayerRatingsList,
  fetchSeasonFilterOptions,
  validatedQueryParams,
} from "./lib/query";
import { PlayerRating } from "./lib/player";
import "./index.css";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    wettbewerb?: string;
    saison?: number;
    verein?: string;
    name?: string;
  };
}) {
  const validatedParams = new validatedQueryParams(searchParams);
  const competitionOptions =
    await fetchCompetitionFilterOptions(validatedParams);
  const seasonOptions = await fetchSeasonFilterOptions(validatedParams);
  console.log(seasonOptions)
  const clubOptions = await fetchClubFilterOptions(validatedParams);
  let players : any = await fetchPlayerRatingsList(validatedParams);
  players = players.map((player : any) => {return new PlayerRating(player)});

  players.sort((a: PlayerRating, b: PlayerRating) => b.conservativeRating() - a.conservativeRating());
  return (
    <main>
      <div>
        <h1 className="flex justify-center mt-[150px] text-4xl lg:text-9xl font-bold antialiased">
          <span className="italic font-black">NDV</span>Rankings
        </h1>
      </div>
      <div className="flex flex-col m-auto mb-6 mt-10">
        <Search category="Name"/>
        <div className="self-center mb-10 flex">
          <Filter category="Wettbewerb" options={competitionOptions} />
          <Filter category="Saison" options={seasonOptions} />
          <Filter category="Verein" options={clubOptions} />
        </div>
      </div>
      <div className="min-w-fit flex flex-col items-center">
        {/* Think about making the player list a suspenseable server component */}
        <div className=" w-fit max-h-[80vh] overflow-hidden hover:overflow-y-scroll">
          {players.map((player: PlayerRating, index: number) => (
            <PlayerListEntry index={index} key={player.humanID} player={player} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-6 mt-10">
        <Suspense fallback={<div className="skeleton w-64 h-16"></div>}>
          <GeneralStats />
        </Suspense>
      </div>
      <div className="mb-8">
        <Footer />
      </div>
    </main>
  );
}