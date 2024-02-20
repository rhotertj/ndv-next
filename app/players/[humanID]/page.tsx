import { PlayerRating } from "@/types/player";
import { fetchPlayerRatings, fetchHumanLastSingles, fetchHumanLastDoubles } from '@/lib/player';
import { SinglesMatch, DoublesMatch } from "@/types/match";
import { RatingCard } from "@/components/player";
import { DoubleMatchEntry, SingleMatchEntry } from "@/components/match";
import Link from "next/link";

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
    let sortedSingles = singles.sort((a : SinglesMatch, b: SinglesMatch) => { return b.date - a.date})
    

    const doublesQueryResult = await fetchHumanLastDoubles(humanID);
    const doubles = doublesQueryResult.map((result) => {return new DoublesMatch(result)})
    let sortedDoubles = doubles.sort((a : DoublesMatch, b: DoublesMatch) => { return b.date - a.date})

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
        <Link key={playerName} href={`/`}>Zurück zu allen Rankings</Link>
        <div className="flex mt-12">
            {/* <div className="avatar">
                <div className="w-24 mask mask-hexagon">
                    <img src="https://www.absoluteanime.com/avatar_the_last_airbender/aang[2].jpg" />
                </div>
            </div> */}
            <div className="flex flex-col">
                <p className="text-4xl mb-6">{playerName}</p>
                {/* badges here, maybe for specials */}
            </div>
            
        </div>
        <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Rankings</h2>
        <div className="mx-6 mt-4 flex flex-wrap gap-x-4">
            {skillRatings.map( (rating: PlayerRating) => <RatingCard rating={rating} key={`${rating.competitionName}-${rating.year}`}/> )}
        </div>
            {/* TODO: Add date and competition to table entry */}
        <h2 className="text-2xl font-bold mt-6">Letzte Spiele</h2>
        <div className="max-w-2xl">
            <table className="table">
                <thead>
                    <tr>
                        <th>Heim</th>
                        <th>Ergebnis</th>
                        <th>Auswärts</th>
                        <th>Datum</th>
                    </tr>
                </thead>
                {sortedSingles.map( (match : SinglesMatch) => <SingleMatchEntry single={match} playerName={playerName} key={`${match.date}-${match.homePlayer}-${match.awayPlayer}-${match.result}`}/>)}
                {sortedDoubles.map( (match : DoublesMatch) => <DoubleMatchEntry double={match} playerName={playerName} key={`${match.date}-${match.homePlayer1}-${match.awayPlayer1}-${match.result}`}/>)}
            </table>
        </div>

        </div>
        </div>
       </main>
    )
  };