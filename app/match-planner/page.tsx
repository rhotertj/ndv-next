import { validatedQueryParams } from "@/types/query";
import { fetchCompetitionFilterOptions, fetchSeasonFilterOptions, fetchClubFilterOptions, fetchPlayerRatingsList } from "@/lib/query";
import { PlayerRating } from "@/types/player";
import Link from "next/link";
import { winProbability, Rating } from "ts-trueskill";
import { Filter } from "@/components/filter";
import { Heatmap } from "@/components/heatmap";

export default async function MatchPlanner({
    searchParams,
  }: {
    searchParams?: {
      Wettbewerb?: string,
      Heimteam?: string,
      Auswärtsteam?: string,
      Saison?: string,
    };
  }) {
    // fetch all player identities
    // for these player identites, find last games, ratings
    console.log(searchParams)
    const validatedParams = new validatedQueryParams(searchParams);
    const competitions = await fetchCompetitionFilterOptions(validatedParams);
    let seasonOptions: any = await fetchSeasonFilterOptions(validatedParams);
    seasonOptions = seasonOptions.map( (option: any) => {return {id: option.year, name: new Date(option.year).getFullYear()}})

    // TODO we simply query options, remove selected from filter options "by hand" and then query data from there with the actual params
    const clubOptions = await fetchClubFilterOptions(validatedParams);
    const showClubOptions = validatedParams.competition !== undefined
    
    let homePlayerRatings, awayPlayerRatings;


    if (searchParams?.Heimteam && searchParams?.Auswärtsteam) {
        const homeParams = {
            Wettbewerb: searchParams?.Wettbewerb,
            Saison: searchParams?.Saison,
            Verein: searchParams?.Heimteam
        }
    
        const awayParams = {
            Wettbewerb: searchParams?.Wettbewerb,
            Saison: searchParams?.Saison,
            Verein: searchParams?.Auswärtsteam
        }
    
        const homeQueryParams = new validatedQueryParams(homeParams)
        const awayQueryParams = new validatedQueryParams(awayParams)
        let homePlayers : any = await fetchPlayerRatingsList(homeQueryParams);
        let awayPlayers : any = await fetchPlayerRatingsList(awayQueryParams);
        homePlayers = homePlayers.map((player : any) => {return new PlayerRating(player)});
        awayPlayers = awayPlayers.map((player : any) => {return new PlayerRating(player)});
        
        homePlayerRatings = homePlayers.map((player : PlayerRating) => {return player.tsRating})
        awayPlayerRatings = awayPlayers.map((player : PlayerRating) => {return player.tsRating})
        console.log(winProbability(homePlayerRatings, awayPlayerRatings))
    }

    // Put them into a list, sort by rating
    // List in respective column - could be a player list again ;)
    // Also show people that showed up more than 10% of the matches, this way we are more accurate
    // Maybe a slightly different query
    // Render win stuff in heat map (component with use client)


    return(
        <div>
            <div className="container flex justify-center mx-auto">
                {/* this div is for keeping things in order despite flex parent */}
                <div className=""> 
                    <div>
                        <h1 className="flex justify-center mt-[100px] text-4xl lg:text-9xl font-bold antialiased">
                            <span className="italic font-black">NDV</span>Rankings
                        </h1>
                    </div>
                    <div className="flex">
                        <Filter category="Saison" options={seasonOptions}/>
                        <Filter category="Wettbewerb" options={competitions}/>
                    </div>

                    <Conditional markup={
                        <div className="flex">
                            <Filter category="Heimteam" options={clubOptions}/>
                            <Filter category="Auswärtsteam" options={clubOptions}/>
                        </div>
                    }
                    condition={showClubOptions}/>
                    
            </div> 
        </div>

        <div>
            <div className="bg-slate-200 mt-16 flex">
                <div className="mr-auto ml-10">
                    Team von links
                </div>
                <div className="ml-auto mr-10">
                    team von rechts
                </div>
            </div>
        </div>

        <div>
            List both teams with respective conservative Ratings
        </div>

        <div>
            <Conditional markup={
                <Heatmap homePlayers={homePlayerRatings} awayPlayers={awayPlayerRatings}/>
            } condition={homePlayerRatings !== undefined}
            />
            {/* https://observablehq.com/@zachpino/birth-heatmap */}
        </div>

        <div>
            Last games between any of these players

        </div>

        </div>
        

    )
  };

function Conditional({ markup, condition }: {markup: any, condition: boolean}) {
if (condition) {
    return markup;
}
return <></>;
}