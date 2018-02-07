// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

   // SI ON VEUR RELIER AU BACKEND

  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '9090',
    endpoints: {

      allCandidat: '/rest/candidat',
      getCandidatById: '/rest/candidat/:id',
      getCandidatByEmail: '/rest/candidat/findByEmail/:email',
      getCandidatExperiences: '/rest/candidat/:id/experiences',
      getCandidatCompetences: '/rest/candidat/:id/competences',
      addCandidatExperience: '/rest/candidat/:id/experiences',
      addCandidatCompetence: '/rest/candidat/:id/competences/:idCompetence',
      updateCandidat: '/rest/candidat',
      deleteCandidat: '/rest/candidat',
      allCompetences: '/rest/competence',
      getCompetence: '/rest/competence/:id',
      deleteCompetence: '/rest/competence/:id',
      addCompetence: '/rest/competence',
      updateCompetence: '/rest/competence',
      login: '/rest/users/login',
      register: '/rest/users',
      getUserByEmail: '/rest/users/:email',
      getUserById: '/rest/users/:id',
      updateUser: '/rest/users',
      updateUserPhoto: '/rest/users/updatePhoto/:email',
      deleteUser: '/rest/users/:email',
      allUsers: '/rest/users',
      allExperiences: '/rest/experience',
      getExperiences: '/rest/experience/:id',
      updateExperience: '/rest/experience',
      deleteExperience: '/rest/experience/:id',
    }
  }
};
