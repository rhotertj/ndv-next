import { SinglesMatch, DoublesMatch } from "@/types/match";

export function SingleMatchEntry({single, playerName}: {single: SinglesMatch, playerName: string}){
    return (
      <div>{single.homePlayer} {single.result} {single.awayPlayer}</div>
    )
  }

export function DoubleMatchEntry({double, playerName}: {double: DoublesMatch, playerName: string}){

    return (
        <div>{double.homePlayer1} / {double.homePlayer2} {double.result} {double.awayPlayer1} / {double.awayPlayer2}</div>
      )
    }