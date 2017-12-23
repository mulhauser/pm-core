export class CandidatModel {

  constructor(
    public nom: string,
    public location: string,
    public date_naissance: string,
    public prenom: string,
    public email: string,
    public password: string,
    public statusActuel?: string,
    public bio?: string,
    public id?: string,
    public photo?: string
  ) {}
}
