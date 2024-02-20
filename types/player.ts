import { Rating } from "ts-trueskill";

export class PlayerRating {
    readonly playerName: string;
    readonly humanID: string;
    readonly ratingMu: number;
    readonly ratingSigma: number;
    readonly competitionName: string;
    readonly clubName: string;
    readonly year: number;
    readonly tsRating: Rating;
  
    constructor(queryResult: any) {
      this.humanID = queryResult.Player.Human.id;
      this.playerName = queryResult.Player.Human.name;
      this.ratingMu = queryResult.rating_mu;
      this.ratingSigma = queryResult.rating_sigma;
      this.competitionName = queryResult.Team.Competition.name;
      this.clubName = queryResult.Player.Club.name;
      this.year = new Date(queryResult.Team.Competition.year).getFullYear();
      this.tsRating = new Rating(this.ratingMu, this.ratingSigma)
    }
  
    conservativeRating(factor=3) {
      return this.ratingMu - (factor * this.ratingSigma)
    }

  }
  