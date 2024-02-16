import { PlayerRating } from "@/types/player";
import { fetchPlayerRatings, fetchHumanLastSingles, fetchHumanLastDoubles } from '@/lib/player';
import { SinglesMatch, DoublesMatch } from "@/types/match";
import { RatingCard } from "@/components/player";
import { DoubleMatchEntry, SingleMatchEntry } from "@/components/match";

export default async function Player({
    params,
  }: {
    params: {
      humanID: string
    };
  }) {
    const humanID = decodeURIComponent(params.humanID)
    const skillRatingsQuery = await fetchPlayerRatings(humanID);
    const skillRatings = skillRatingsQuery.map((result) => new PlayerRating(result))
    const singlesQueryResult = await fetchHumanLastSingles(humanID);
    const singles = singlesQueryResult.map((result) => {return new SinglesMatch(result)})

    const doublesQueryResult = await fetchHumanLastDoubles(humanID);
    const doubles = doublesQueryResult.map((result) => {return new DoublesMatch(result)})

    const playerName = skillRatings[0].playerName

    // fetch all player identities
    // for these player identites, find last games, ratings
    return(
       <main className="container flex justify-center mx-auto">
        <div className="">
        <div>
            <h1 className="flex justify-center mt-[100px] text-4xl lg:text-9xl font-bold antialiased">
                <span className="italic font-black">NDV</span>Rankings
            </h1>
        </div>
        {/* dont completely center, more to the left would be nice */}
        <div className="flex mt-12">
            {/* <div className="avatar">
                <div className="w-24 mask mask-hexagon">
                    <img src="https://www.absoluteanime.com/avatar_the_last_airbender/aang[2].jpg" />
                </div>
            </div> */}
            <div className="flex flex-col">
                {/* DOES NOT WORK IF PLAYER HAS NO SKILL RATING */}
                <p className="text-4xl mb-6">{playerName}</p>
                {/* badges here */}
            </div>
            
        </div>
        <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Rankings</h2>
        <div className="flex">
            {skillRatings.map( (rating: PlayerRating) => <RatingCard rating={rating}/> )}
        </div>

        <h2 className="text-2xl font-bold mt-6">Letzte Spiele</h2>
            <div>
                {singles.map( (match : SinglesMatch) => <SingleMatchEntry single={match} playerName={playerName}/>)}
            </div>
            <div>
                {doubles.map( (match : DoublesMatch) => <DoubleMatchEntry double={match} playerName={playerName}/>)}
            </div>
        </div>
        </div>
       </main>
    )
  };