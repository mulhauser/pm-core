export const environment = {
  production: true,

  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '9090',
    endpoints: {

      allCompetences: '/rest/competence',
      specificCompetence: '/rest/competence/:id',
      addCompetence: '/rest/competence',
      modifyCompetence: '/rest/competence',
      addUser: '/rest/utilisateur/inscrire',
      getUser: '/rest/utilisateur/get/:email',

      allExperiences: '/rest/experience'
    }
  }
};
