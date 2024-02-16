export class validatedQueryParams {
    _competition: string;
    _season: Date;
    _club: string;
    _name: string;
  
    constructor(searchParams: any) {
      this._competition = searchParams?.Wettbewerb;
      this._season = searchParams?.Saison;
      this._name = searchParams?.Name;
      this._club = searchParams?.Verein;
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
  }
  