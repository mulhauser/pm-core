import {Candidat} from "./candidat";

export class Experience {

  constructor(
    public id: number,
    public typeContrat: string,
    public dateDebut: string,
    public dateFin: string,
    public description: string,
    public posteOccuper: string,
    public candidat: Candidat
  ) {}
}

