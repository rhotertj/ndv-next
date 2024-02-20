export class validatedQueryParams {
    _competition: string;
    _season: Date;
    _club: string;
    _name: string;
    _home_club: string;
    _away_club: string;
    _rank: string;
  
    constructor(searchParams: any) {
      this._competition = searchParams?.Wettbewerb;
      this._season = searchParams?.Saison;
      this._name = searchParams?.Name;
      this._club = searchParams?.Verein;
      this._home_club = searchParams?.Heimteam;
      this._away_club = searchParams?.Auswärtsteam;
      this._rank = searchParams?.Team;
    }
  
    get name() {
      if (this._name === null) {
        return undefined;
      }
      return this._name;
    }
  
    get competition() {
      if (this._competition === null) {
        return undefined;
      }
      return this._competition;
    }
  
    get club() {
      if (this._club === null) {
        return undefined;
      }
      return this._club;
    }
  
    get season() {
      if (this._season === null) {
        return undefined;
      }
      return this._season;
    }

    get home_club() {
      if (this._home_club === null) {
        return undefined;
      }
      return this._home_club;
    }

    get away_club() {
      if (this._away_club === null) {
        return undefined;
      }
      return this._away_club;
    }
    get rank() {
      if (this._rank === null) {
        return undefined;
      }
      return this._rank;
    }
  }
  