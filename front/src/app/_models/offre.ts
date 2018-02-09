import {Competence} from "./competence";
import {Candidat} from "./candidat";

export class Offre {
  constructor(
    public id: number,
    public intitule: string,
    public niveauRequis: string,
    public dateEmission: string,
    public typeContrat: string,
    public description: string,
    public mission: string,
    public dateLimite: string,
    public candidats: Candidat[],
    public competences: Competence[],
    public suspendu: boolean,
    public salaireMin?: number,
    public salaireMax?: number,
   ) {}
}
