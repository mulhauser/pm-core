export class CompetenceModel {

  constructor(
    public id: number,
    public nom: string,
    public description: string,
    public offres: any,
    public candidats?: any
  ) {}
}

