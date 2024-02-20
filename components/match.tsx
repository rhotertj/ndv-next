import { SinglesMatch, DoublesMatch } from "@/types/match";

function conditionalWinnerCrown(result : string, side: string) {
  switch (side) {
    case "home":
      if (result[0] > result[2]) {
        return "👑"
      }
      break;
    case "away":
        if (result[2] > result[0]) {
          return "👑"
        }
        break;
  }
  return "";
}

export function SingleMatchEntry({single, playerName}: {single: SinglesMatch, playerName: string}){
    return (
      <tr>
        <td className={`${single.homePlayer == playerName ? 'text-secondary' : ''}`}>
          {single.homePlayer} <span>{conditionalWinnerCrown(single.result, "home")}</span>
        </td>
        <td>
          {single.result} 
        </td>
        <td className={`${single.awayPlayer == playerName ? 'text-secondary' : ''}`}>
          {single.awayPlayer} <span>{conditionalWinnerCrown(single.result, "away")}</span>
        </td>
        <td>
          {single.getDateString()}
        </td>
      </tr>
    )
  }

export function DoubleMatchEntry({double, playerName}: {double: DoublesMatch, playerName: string}){

    return (
      <tr>
        <td>
          <p className={`${double.homePlayer1 == playerName ? 'text-secondary' : ''}`}>{double.homePlayer1} <span>{conditionalWinnerCrown(double.result, "home")}</span></p>
          <p className={`${double.homePlayer2 == playerName ? 'text-secondary' : ''}`}>{double.homePlayer2} <span>{conditionalWinnerCrown(double.result, "home")}</span></p>
        </td>
        <td>
          {double.result} 
        </td>
        <td>
          <p className={`${double.awayPlayer1 == playerName ? 'text-secondary' : ''}`}>{double.awayPlayer1} <span>{conditionalWinnerCrown(double.result, "away")}</span></p>
          <p className={`${double.awayPlayer2 == playerName ? 'text-secondary' : ''}`}>{double.awayPlayer2} <span>{conditionalWinnerCrown(double.result, "away")}</span></p>
        </td>
        <td>
          {double.getDateString()}
        </td>
      </tr>
      )
    }