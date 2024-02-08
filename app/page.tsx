import Image from "next/image";
import {PlayerListEntry, PlayerType} from "./ui/player";
import { Filter } from "./ui/filter";
import './index.css'

const fakeplayer : PlayerType = {
  name: "Mämmäd Gulijev",
  ranking: 12.09,
  ranking_mu: 25.56,
  ranking_sigma: 3.87,
  club: "Dart Akademie Hannover e.V.",
  humanID: "memo485894"
}

export default function Home() {
  const data = {players : 781, matches: 8900, competitions: 22}
  return (
    <main>
      <div className="mx-auto w-6/12">
        <h1 className="text-center mt-[150px] text-8xl font-bold antialiased"><span className="italic font-black">NDV</span> Rankings</h1>
        <div className="flex mx-auto justify-center mb-4">
          <div className="m-6"><span className="text-2xl">{data.players}</span> Spieler</div>
          <div className="m-6"><span className="text-2xl">{data.matches}</span> Matches</div>
          <div className="m-6"><span className="text-2xl">{data.competitions}</span> Wettbewerbe</div>
        </div>
        <div className="flex mx-auto justify-center mb-6">Letzter Stand: 12.02.2024</div>
      </div>
      <div className="flex flex-col m-auto mb-6" >
        <input type="text" className="self-center w-auto mb-6" />
        <div className="self-center mb-10 flex">
          <Filter/>
          <Filter/>
          <Filter/>
        </div>
      </div>
      <div className="mx-auto max-w-screen-sm">
        <PlayerListEntry index={1} player={fakeplayer}/>
        <PlayerListEntry index={2} player={fakeplayer}/>
        <PlayerListEntry index={3} player={fakeplayer}/>
      </div>
    </main>
  );
}
