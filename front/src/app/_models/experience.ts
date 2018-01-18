export class Experience {

  constructor(
    public id: number,
    public typeContrat: string,
    public dateDebut: Date,
    public dateFin: Date,
    public description: string,
    public posteOccuper: string,
    public candidat?: any
  ) {}
}

