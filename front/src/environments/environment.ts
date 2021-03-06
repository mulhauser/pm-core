// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

   // SI ON VEUR RELIER AU BACKEND

  backend: {
    protocol: 'http',
    //host: '192.168.43.222',
    host: 'localhost',
    port: '9090',
    endpoints: {
      // Candidat
      allCandidat: '/rest/candidat',
      getCandidatById: '/rest/candidat/:id',
      getCandidatByEmail: '/rest/candidat/findByEmail/:email',
      getCandidatExperiences: '/rest/candidat/:id/experiences',
      getCandidatCompetences: '/rest/candidat/:id/competences',
      addCandidatExperience: '/rest/candidat/:id/experiences',
      addCandidatCompetence: '/rest/candidat/:id/competences/:idCompetence',
      deleteCandidatCompetence: '/rest/candidat/:id/competences/:idCompetence',
      updateCandidat: '/rest/candidat',
      deleteCandidat: '/rest/candidat/:id',
      getOffresByCandidat: '/rest/candidat/:id/offres',
      getBestOffresByCandidat: '/rest/candidat/:id/bestOffres',
      postulerOffre: '/rest/candidat/:id/offres',
      suspendreCandidat: '/rest/candidat/suspendre/:id',
      annulerOffre: 'rest/candidat/:id/offres/:idOffre',
      // Competence
      allCompetences: '/rest/competence',
      getCompetence: '/rest/competence/:id',
      deleteCompetence: '/rest/competence/:id',
      addCompetence: '/rest/competence',
      updateCompetence: '/rest/competence',
      // User & Login/Register
      login: '/rest/users/login',
      register: '/rest/users',
      getUserByEmail: '/rest/users/:email',
      getUserById: '/rest/users/:id',
      updateUser: '/rest/users',
      updateUserPhoto: '/rest/users/updatePhoto/:email',
      deleteUser: '/rest/users/:email',
      allUsers: '/rest/users',
      statistiques: '/rest/users/statistique',
      // Experience
      allExperiences: '/rest/experience',
      getExperiences: '/rest/experience/:id',
      updateExperience: '/rest/experience/:id',
      deleteExperience: '/rest/experience/:id',
      // Offre
      oneOffre: '/rest/offres/:id',
      allOffres: '/rest/offres',
      getUsersByCompetence: '/rest/offres/:id/utilisateurs',
      getCandidatMatch: '/rest/matcherOffre/:id/:bool',
      suspendreOffre: '/rest/offres/suspendre/:id',
      getPostulants: '/rest/offres/:id/postulants',
      // ServiceMail
      sendMail: '/rest/serviceMail/envoyer',
      // Recruteur
      allRecruteur: '/rest/recruteur',
      getRecruteurById: '/rest/recruteur/:id',
      getRecruteurByEmail: '/rest/recruteur/findByEmail/:email',
      updateRecruteur: '/rest/recruteur',
      deleteRecruteur: '/rest/recruteur/:id',
      susprendreRecruteur: '/rest/recruteur/suspendre/:id',
      addOffreToRecruteur: '/rest/recruteur/:id/offres',
      getOffresByRecruteur: '/rest/recruteur/:id/offres',
      updateOffresByRecruteur: '/rest/recruteur/:id/offres' // à faire côté back
    }
  }
};
