import {Offre} from "./offre";
import {Candidat} from "./candidat";

export class Competence {

  constructor(
    public id: number,
    public nom: string,
    public description: string,
    public offres: Offre[],
    public candidats: Candidat[]
  ) {}
}

