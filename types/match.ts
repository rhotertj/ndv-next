
function getLocaleDateString(date: Date){
  let formatter = new Intl.DateTimeFormat(
    "de-de",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }
  )
  return formatter.format(date)
  
}

export class SinglesMatch {
    readonly homePlayer: string;
    readonly awayPlayer: string;
    readonly result: string;
    readonly date: Date;
  
    constructor(match: any) {
      // make sure before that we pass single and not double
      this.homePlayer = match.Player_Singlesmatch_home_playerToPlayer.Human.name;
      this.awayPlayer = match.Player_Singlesmatch_away_playerToPlayer.Human.name;
      this.result = match.result;
      this.date = new Date(match.Teammatch.date);
    }

    
    public getDateString() {
      return getLocaleDateString(this.date)
    }
    
  }
  
  export class DoublesMatch {
    readonly homePlayer1: string;
    readonly homePlayer2: string;
    readonly awayPlayer1: string;
    readonly awayPlayer2: string;
    readonly result: string;
    readonly date: Date;

    constructor(match: any) {
      // make sure before that we pass single and not double
      this.homePlayer1 = match.Player_Doublesmatch_home_player1ToPlayer.Human.name;
      this.homePlayer2 = match.Player_Doublesmatch_home_player2ToPlayer.Human.name;
      this.awayPlayer1 = match.Player_Doublesmatch_away_player1ToPlayer.Human.name;
      this.awayPlayer2 = match.Player_Doublesmatch_away_player2ToPlayer.Human.name;
      this.result = match.result;
      this.date = new Date(match.Teammatch.date);
    }

    public getDateString() {
      return getLocaleDateString(this.date)
    }
  }