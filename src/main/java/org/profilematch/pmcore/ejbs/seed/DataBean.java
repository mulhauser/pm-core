package org.profilematch.pmcore.ejbs.seed;

import org.profilematch.pmcore.ejbs.*;
import org.profilematch.pmcore.entities.*;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;

/**
 * @author remy
 */
@Startup
@Singleton
public class DataBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;
    @EJB
    private CandidatBean candidatBean;
    @EJB
    private RecruteurBean recruteurBean;
    @EJB
    private ExperienceBean experienceBean;
    @EJB
    private CompetenceBean competenceBean;
    @EJB
    private OffreBean offreBean;

    @PostConstruct
    public void init(){
        // AJOUT DES COMPETENCES EN DUR
        Competence c1 = new Competence();
        c1.setNom("java");
        c1.setDescription("Maîtrise du langage Java en général");

        Competence c2 = new Competence();
        c2.setNom("sql");
        c2.setDescription("Maîtrise du langage SQL en général");

        Competence c3 = new Competence();
        c3.setNom("c");
        c3.setDescription("Maîtrise du langage C en général");

        Competence c4 = new Competence();
        c4.setNom("angular 4");
        c4.setDescription("Maîtrise du framework Angular 4 en général");

        Competence c5 = new Competence();
        c5.setNom("design pattern");
        c5.setDescription("Maîtrise des Design Pattern en général");

        Competence c6 = new Competence();
        c6.setNom("jquery");
        c6.setDescription("Maîtrise du langage JQuery en général");

        Competence c7 = new Competence();
        c7.setNom("uml");
        c7.setDescription("Connaissance du langage de modélisation UML");

        Competence c8 = new Competence();
        c8.setNom("c++");
        c8.setDescription("Maîtrise du langage C++ en général");

        Competence c9 = new Competence();
        c9.setNom("c#");
        c9.setDescription("Maîtrise du langage C# en général");

        Competence c10 = new Competence();
        c10.setNom("event-b");
        c10.setDescription("Maîtrise du langage Event-B en général");

        em.persist(c1);
        em.persist(c2);
        em.persist(c3);
        em.persist(c4);
        em.persist(c5);
        em.persist(c6);
        em.persist(c7);
        em.persist(c8);
        em.persist(c9);
        em.persist(c10);


        // AJOUT DE QUELQUES CANDIDATS ET RECRUTEURS EN DUR
        User c = new User();
        c.setEmail("michel@gmail.com");
        c.setFirstName("Michel");
        c.setLastName("Wolkowicz");
        c.setPassword("test");
        c.setType("candidat");
        em.persist(c);
        Candidat cand = new Candidat(c.getLastName(), c.getFirstName(), c.getEmail());
        cand.setPays("France");
        cand.setVille("Nancy");
        cand.setCodePostal("54000");
        cand.setTelephone("+33612190347");
        cand.setTitre("Développeur Front End");
        cand.setApropos("Je me nomme Michel Wolkowicz et je suis étudiant en mater informatique à l'Université de Lorraine");
        cand.setUrlPhoto("http://www.ucgl.net/public/style_images/aktolia/profile/default_large.png");

        candidatBean.ajouterCandidat(cand);
        c4.getCandidats().add(cand);
        c8.getCandidats().add(cand);

        Experience e = new Experience();
        e.setTypeContrat("Stage");
        e.setPosteOccuper("Développeur junior");
        e.setDateDebut(new Date(117,00,10));
        e.setDateFin(new Date(117,11,12));
        e.setCandidat(cand);
        e.setDescription("Développement d'une application de gestion d'une bibliothèque");
        experienceBean.ajouterExperience(e);
        Experience e2 = new Experience();
        e2.setTypeContrat("CDD");
        e2.setPosteOccuper("Développeur junior");
        e2.setDateDebut(new Date(118,01,10));
        e2.setDateFin(new Date(118,03,12));
        e2.setCandidat(cand);
        e2.setDescription("Développement d'une application Web avec Laravel");
        experienceBean.ajouterExperience(e2);








        User c22 = new User();
        c22.setEmail("flavien@gmail.com");
        c22.setFirstName("Flavien");
        c22.setLastName("Mondy");
        c22.setPassword("test");
        c22.setType("candidat");
        em.persist(c22);
        Candidat cand2 = new Candidat(c22.getLastName(), c22.getFirstName(), c22.getEmail());
        cand2.setPays("France");
        cand2.setVille("Nancy");
        cand2.setCodePostal("54000");
        cand2.setTelephone("+33612191234");
        cand2.setTitre("Développeur Full Stack");
        cand2.setApropos("Je me nomme Flavien Mondy et je suis étudiant en mater informatique à l'Université de Lorraine");
        cand2.setUrlPhoto("https://avatarfiles.alphacoders.com/849/84930.png");

        candidatBean.ajouterCandidat(cand2);
        c4.getCandidats().add(cand2);
        c5.getCandidats().add(cand2);
        c6.getCandidats().add(cand2);


        Experience e1 = new Experience();
        e1.setTypeContrat("Stage");
        e1.setPosteOccuper("Développeur junior");
        e1.setDateDebut(new Date(117,00,11));
        e1.setDateFin(new Date(117,11,12));
        e1.setCandidat(cand2);
        e1.setDescription("Développement d'une application de gestion d'un garage");
        experienceBean.ajouterExperience(e1);
        Experience e22 = new Experience();
        e22.setTypeContrat("CDD");
        e22.setPosteOccuper("Développeur junior");
        e22.setDateDebut(new Date(118,01,10));
        e22.setDateFin(new Date(118,03,12));
        e22.setCandidat(cand2);
        e22.setDescription("Développement d'une application pour les annimaux");
        experienceBean.ajouterExperience(e22);








        User c33 = new User();
        c33.setEmail("thomas@gmail.com");
        c33.setFirstName("Thomas");
        c33.setLastName("Denis");
        c33.setPassword("test");
        c33.setType("candidat");
        em.persist(c33);
        Candidat cand3 = new Candidat(c33.getLastName(), c33.getFirstName(), c33.getEmail());
        cand3.setPays("France");
        cand3.setVille("Nancy");
        cand3.setCodePostal("54000");
        cand3.setTelephone("+33612195555");
        cand3.setTitre("Développeur Front End");
        cand3.setApropos("Je me nomme Thomas Denis et je suis étudiant en mater informatique à l'Université de Lorraine");
        cand3.setUrlPhoto("http://logo.pizza/img/dog-profile/dog-profile.png");

        candidatBean.ajouterCandidat(cand3);
        c1.getCandidats().add(cand3);
        c6.getCandidats().add(cand3);

        Experience e3 = new Experience();
        e3.setTypeContrat("Stage");
        e3.setPosteOccuper("Développeur junior");
        e3.setDateDebut(new Date(117,00,10));
        e3.setDateFin(new Date(117,11,12));
        e3.setCandidat(cand3);
        e3.setDescription("Développement d'une application de gestion d'une bibliothèque");
        experienceBean.ajouterExperience(e3);
        Experience e23 = new Experience();
        e23.setTypeContrat("CDD");
        e23.setPosteOccuper("Développeur junior");
        e23.setDateDebut(new Date(118,01,10));
        e23.setDateFin(new Date(118,03,12));
        e23.setCandidat(cand3);
        e23.setDescription("Développement d'une application Web avec Laravel");
        experienceBean.ajouterExperience(e23);






        User c44 = new User();
        c44.setEmail("remy@gmail.com");
        c44.setFirstName("Remy");
        c44.setLastName("Mulhauser");
        c44.setPassword("test");
        c44.setType("candidat");
        em.persist(c44);
        Candidat cand4 = new Candidat(c44.getLastName(), c44.getFirstName(), c44.getEmail());
        cand4.setPays("France");
        cand4.setVille("Nancy");
        cand4.setCodePostal("54000");
        cand4.setTelephone("+33612196666");
        cand4.setTitre("Développeur Full Stack");
        cand4.setApropos("Je me nomme Remy Mulhauser et je suis étudiant en mater informatique à l'Université de Lorraine");
        cand4.setUrlPhoto("https://lh3.googleusercontent.com/-ElFqsB8ag4g/VuyDE_HKkzI/AAAAAAAAAUs/9JjtPtmS4Yw/w500-h500/gamingxrk_profile_clash_royale_francais_youtube.jpg");

        candidatBean.ajouterCandidat(cand4);
        c1.getCandidats().add(cand4);
        c7.getCandidats().add(cand4);

        Experience e44 = new Experience();
        e44.setTypeContrat("Stage");
        e44.setPosteOccuper("Développeur junior");
        e44.setDateDebut(new Date(117,00,10));
        e44.setDateFin(new Date(117,11,12));
        e44.setCandidat(cand4);
        e44.setDescription("Développement d'une application de gestion d'une bibliothèque");
        experienceBean.ajouterExperience(e44);
        Experience e24 = new Experience();
        e24.setTypeContrat("CDD");
        e24.setPosteOccuper("Développeur junior");
        e24.setDateDebut(new Date(118,01,10));
        e24.setDateFin(new Date(118,03,12));
        e24.setCandidat(cand4);
        e24.setDescription("Développement d'une application Web avec Laravel");
        experienceBean.ajouterExperience(e24);








        User c55 = new User();
        c55.setEmail("nicolas@gmail.com");
        c55.setFirstName("Nicloas");
        c55.setLastName("Blin");
        c55.setPassword("test");
        c55.setType("candidat");
        em.persist(c55);
        Candidat cand5 = new Candidat(c55.getLastName(), c55.getFirstName(), c55.getEmail());
        cand5.setPays("France");
        cand5.setVille("Nancy");
        cand5.setCodePostal("54000");
        cand5.setTelephone("+33612190347");
        cand5.setTitre("Développeur Front End");
        cand5.setApropos("Je me nomme Nicloas BLin et je suis étudiant en mater informatique à l'Université de Lorraine");
        cand5.setUrlPhoto("http://s9.favim.com/orig/130815/paris-pretty-sky-beautiful-Favim.com-854842.jpg");

        candidatBean.ajouterCandidat(cand5);
        c4.getCandidats().add(cand5);
        c2.getCandidats().add(cand5);

        Experience e55 = new Experience();
        e55.setTypeContrat("Stage");
        e55.setPosteOccuper("Développeur junior");
        e55.setDateDebut(new Date(117,00,10));
        e55.setDateFin(new Date(117,11,12));
        e55.setCandidat(cand5);
        e55.setDescription("Développement d'une application de gestion d'une bibliothèque");
        experienceBean.ajouterExperience(e55);
        Experience e25 = new Experience();
        e25.setTypeContrat("CDD");
        e25.setPosteOccuper("Développeur junior");
        e25.setDateDebut(new Date(118,01,10));
        e25.setDateFin(new Date(118,03,12));
        e25.setCandidat(cand5);
        e25.setDescription("Développement d'une application Web avec Laravel");
        experienceBean.ajouterExperience(e25);








        User c66 = new User();
        c66.setEmail("titem@gmail.com");
        c66.setFirstName("Titem");
        c66.setLastName("Lehamel");
        c66.setPassword("test");
        c66.setType("candidat");
        em.persist(c66);
        Candidat cand6 = new Candidat(c66.getLastName(), c66.getFirstName(), c66.getEmail());
        cand6.setPays("France");
        cand6.setVille("Nancy");
        cand6.setCodePostal("54000");
        cand6.setTelephone("+33612179847");
        cand6.setTitre("Développeur Back End");
        cand6.setApropos("Je me nomme Titem Lehamel et je suis étudiante en mater informatique à l'Université de Lorraine");
        cand6.setUrlPhoto("http://s2.favim.ru/orig/151213/avatar-dzhoker-profil-Favim.ru-3761170.jpg");
        candidatBean.ajouterCandidat(cand6);
        c1.getCandidats().add(cand6);
        c5.getCandidats().add(cand6);

        Experience e66 = new Experience();
        e66.setTypeContrat("Stage");
        e66.setPosteOccuper("Développeur junior");
        e66.setDateDebut(new Date(117,00,10));
        e66.setDateFin(new Date(117,11,12));
        e66.setCandidat(cand6);
        e66.setDescription("Développement d'une application de gestion d'une bibliothèque");
        experienceBean.ajouterExperience(e66);
        Experience e26 = new Experience();
        e26.setTypeContrat("CDD");
        e26.setPosteOccuper("Développeur junior");
        e26.setDateDebut(new Date(118,01,10));
        e26.setDateFin(new Date(118,03,12));
        e26.setCandidat(cand6);
        e26.setDescription("Développement d'une application Web avec Laravel");
        experienceBean.ajouterExperience(e26);







        User r = new User();
        r.setEmail("recruteur@gmail.com");
        r.setFirstName("Elon");
        r.setLastName("Musk");
        r.setPassword("test");
        r.setType("recruteur");
        em.persist(r);
        Recruteur recru = new Recruteur(r.getLastName(), r.getFirstName(), r.getEmail()) ;
        recruteurBean.ajouterRecruteur(recru);
        Offre o = new Offre();
        o.setDateLimite(new Date(118,12,10));
        o.setDescription("Stage dan le développement java avec une équipe de 5 personnes chez spaceX");
        c1.getOffres().add(o);
        c2.getOffres().add(o);
        o.setTypeContrat("Stage");
        o.setIntitule("Recherche stagiaire Développement JAVA chez SpaceX");
        o.setNiveauRequis("Master Informatique");
        o.setSalaireMin(1000);
        o.setSalaireMax(1500);
        o.setMission("Developpement de module supplémentaire sur un application de gestion de personnes pour envoyer des gens sur mars");
        o.setRecruteur(recru);
        offreBean.creerOffre(o);

        Offre o2 = new Offre();
        o2.setDateLimite(new Date(118,12,10));
        o2.setDescription("Recherhe développeur dans le développement informatique C++ afin de faire une voiture Tesla encore plus rapide pour pouvoir aller sur la lune avec tout ça depuis un simulateur en fait");
        c3.getOffres().add(o);
        c1.getOffres().add(o);
        o2.setTypeContrat("CDD");
        o2.setIntitule("Recherche d'un développeur informatique chez Tesla");
        o2.setNiveauRequis("Master Informatique");
        o2.setSalaireMin(2600);
        o2.setSalaireMax(3200);
        o2.setMission("Developpement de module supplémentaire sur un système embarqué");
        o2.setRecruteur(recru);
        c4.getOffres().add(o2);
        c8.getOffres().add(o2);
        offreBean.creerOffre(o2);

        em.flush();


















    }

}
