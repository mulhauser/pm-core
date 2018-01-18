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
    public candidats: any,
    public competences: any,
    public salaireMin?: number,
    public salaireMax?: number
   ) {}
}
