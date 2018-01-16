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

      allCompetences: '/rest/competence',
      specificCompetence: '/rest/competence/:id',
      addCompetence: '/rest/competence',
      modifyCompetence: '/rest/competence',
      addUser: '/rest/utilisateur/inscrire',
      getUser: '/rest/utilisateur/get/:email',
      login: '/rest/users/login',
      register: '/rest/utilisateur/register',

      allExperiences: '/rest/experience',
      createUser: '/rest/users',
    }
  }
};
