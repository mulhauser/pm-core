import {InMemoryDbService} from 'angular-in-memory-web-api';

export class AppDataService implements InMemoryDbService {

  createDb() {
    let offres = [
      {
        id: 1,
        title: 'this is a title',
        description: 'this is the full descriptionb lablabla' +
        'blab labla' +
        'blablabla' +
        'blablabla' +
        'blab labla' +
        'blablab lablablabl ablab lablabla blabla' +
        'blablablablablabla',
        location: 'Nancy',
        date: '2017-09-10',
        societe: 'ouioui Company',
        photo: '../../assets/societe_anonyme.jpg'
      },
      {
        id: 2,
        title: 'this is a title 2',
        description: 'this is the full description 2' +
        'blablab lablablab la' +
        'blabla blablab lablablablab labla blablabla blabla' +
        'blablablablablabla' +
        'blab labla' +
        'blab labla' +
        'blablabla' +
        'blab lablablabla blabla blabla' +
        'blabla bla',
        location: 'Nancy',
        date: '2017-09-10',
        societe: 'nonoon Company',
        photo: '../../assets/societe_anonyme.jpg'
      },
      {
        id: 3,
        title: 'this is a title 3',
        description: 'this is the full description 3 blab labl ablabla blabla blablabla blabla' +
        'blabla blabl ablabl abl abl ablabl ablabl' +
        'ablab labla blabl blablabla bla',
        location: 'Nancy',
        date: '2017-09-10',
        societe: 'azeaze Company',
        photo: '../../assets/societe_anonyme.jpg'
      }
    ];
    let candidats = [
      {
        id: 1,
        nom: 'nom1',
        prenom: 'prenom1',
        bio: 'this is the full descriptionb lablabla' +
        'blab labla' +
        'blablabla' +
        'blablabla' +
        'blab labla' +
        'blablab lablablabl ablab lablabla blabla' +
        'blablablablablabla',
        location: 'Nancy',
        date_naissance: '2017-09-10',
        statusActuel: 'etudiant',
        password: 'admin',
        photo: '../../assets/candidat.jpg',
        email: 'aze@gmail.com'
      },
      {
        id: 2,
        nom: 'nom2',
        prenom: 'prenom2',
        bio: 'this is the full descriptionb lablabla' +
        'blab labla',
        location: 'Paris',
        date_naissance: '2017-09-10',
        statusActuel: 'Chômeur',
        password: 'admin',
        photo: '../../assets/candidat.jpg',
        email: 'aqw@gmail.com'

      }
    ];
    return { offres, candidats };
  }
}

