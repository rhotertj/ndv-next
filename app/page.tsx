import { Footer } from "./ui/footer";
import {PlayerListEntry, PlayerType} from "./ui/player";
import { Filter } from "./ui/filter";
import { GeneralStats } from "./ui/stats";
import './index.css'
import {MetaData, fetchMetaData} from "./lib/dataFetching"
import { Suspense } from "react";

const fakeplayer : PlayerType = {
  name: "Mämmäd Gulijev",
  ranking: 12.09,
  ranking_mu: 25.56,
  ranking_sigma: 3.87,
  club: "Dart Akademie Hannover e.V.",
  humanID: "memo485894"
}

export default async function Home() {
  return (
    <main>
      <div>
        <h1 className="flex justify-center mt-[150px] text-4xl lg:text-9xl font-bold antialiased">
          <span className="italic font-black">NDV</span>Rankings
        </h1>
      </div>
      <div className="flex flex-col m-auto mb-6 mt-10" >
        <input type="text" className="input drop-shadow-lg self-center mb-6 text-lg" placeholder="Spielername" />
        <div className="self-center mb-10 flex">
          <Filter category="Wettbewerb"/>
          <Filter category="Saison"/>
          <Filter category="Verein"/>
        </div>
      </div>
      {/* overflow-y-scroll max-h-[700px]  scrolling feels buggy*/}
      <div className="flex flex-col items-center ">
        <PlayerListEntry index={1} player={fakeplayer}/>
        <PlayerListEntry index={2} player={fakeplayer}/>
        <PlayerListEntry index={3} player={fakeplayer}/>
        <PlayerListEntry index={3} player={fakeplayer}/>
        <PlayerListEntry index={3} player={fakeplayer}/>
        <PlayerListEntry index={3} player={fakeplayer}/>
        <PlayerListEntry index={3} player={fakeplayer}/>
        <PlayerListEntry index={3} player={fakeplayer}/>
        <PlayerListEntry index={3} player={fakeplayer}/>
        <PlayerListEntry index={3} player={fakeplayer}/>
      </div>
      <div className="flex justify-center mb-6 mt-6">
          <Suspense fallback={<div className="skeleton w-64 h-16"></div>}>
            <GeneralStats />
          </Suspense>
        </div>
      <Footer />
    </main>
  );
}
