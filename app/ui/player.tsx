import Link from "next/link"

export type PlayerType = {
    name: string,
    club: string,
    ranking: number,
    ranking_mu: number,
    ranking_sigma: number,
    humanID: string
}

export function PlayerListEntry({index, player} : {index : number, player : PlayerType}) {
    return (
        <Link key={player.humanID} href={`/players/${player.humanID}`}>
            <div className="flex player-container border border-solid rounded-md mb-1 min-w-fit lg:min-w-[650px] max-w-screen-lg">
                <div className="player-indicator w-2"></div>
                <div className="flex-col self-center my-2 mx-4">{index}.</div>
                <div className="flex flex-col my-3 mr-4">
                    <div className="flex">
                        <p className="text-lg font-bold mb-2 mr-2">{player.name}</p>
                        {/* <div className="badge badge-primary badge-outline mt-0.5">
                            ⭐TODO: This can display bades with info text when we actually have the data
                        </div> */}
                    </div>
                    <p className="italic">{player.club}</p>
                </div>
                <div className="flex flex-col ml-auto mr-8 self-center">
                    <p className="mt-2">r=<span className="text-2xl font-bold italic">{player.ranking}</span></p>
                </div>
                <div className="flex flex-col ml-6 mr-6 self-center">
                    <p className="m-1">μ= <span>{player.ranking_mu}</span></p>
                    <p className="m-1">σ= <span>{player.ranking_sigma}</span></p>
                </div>                
            </div>
        </Link>
    )
}
