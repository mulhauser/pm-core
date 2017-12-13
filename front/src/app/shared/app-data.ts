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
    return { offres };
  }
}

