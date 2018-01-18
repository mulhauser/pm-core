import {Profil} from "./profil";
import {Experience} from "./experience";
import {Competence} from "./competence";
import {Offre} from "./offre";

export class Candidat extends Profil {
  experiences: Experience[];
  competences: Competence[];
  offres: Offre[];
}
