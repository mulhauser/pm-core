export class CandidatModel {

  constructor(
    public email: string,
    public password: string,
    public id: number,
    public nom?: string,
    public prenom?: string,
    public pays?: string,
    public ville?: string,
    public codePostal?: string,
    public telephone?: string,
    public dateNaissance?: string,
    public titre?: string,
    public status?: string,
    public statusActuel?: string,
    public apropos?: string,
    public experiences?: any,
    public competences?: any, //type ARray pour les any mais pas encore certain de comment exactement
    public offre?: any,
    public urlPhoto?: string
  ) {}
}
