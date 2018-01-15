// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
<<<<<<< HEAD
   // SI ON VEUR RELIER AU BACKEND
=======
>>>>>>> 409903f62b160029752637c4ef8c8c26667415fa
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '9090',
    endpoints: {
<<<<<<< HEAD
      allCompetences: 'rest/competence',
      specificCompetence: 'rest/competence/:id',
      addCompetence: 'rest/competence',
      modifyCompetence: 'rest/competence'
=======
      addUser: '/rest/utilisateur/inscrire',
      getUser: '/rest/utilisateur/get/:email',
>>>>>>> 409903f62b160029752637c4ef8c8c26667415fa
    }
  }
};
