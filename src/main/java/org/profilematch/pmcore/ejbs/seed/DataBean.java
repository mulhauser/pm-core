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

        em.persist(c1);
        em.persist(c2);
        em.persist(c3);
        em.persist(c4);
        em.persist(c5);
        em.persist(c6);

        User c = new User();
        c.setEmail("candidat@gmail.com");
        c.setFirstName("PrenomCand");
        c.setLastName("NomCand");
        c.setPassword("test");
        c.setType("candidat");
        em.persist(c);
        Candidat cand = new Candidat(c.getLastName(), c.getFirstName(), c.getEmail());
        candidatBean.ajouterCandidat(cand);
        c1.getCandidats().add(cand);
        c2.getCandidats().add(cand);

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

        User r = new User();
        r.setEmail("recruteur@gmail.com");
        r.setFirstName("PrenomRecru");
        r.setLastName("NomRecru");
        r.setPassword("test");
        r.setType("recruteur");
        em.persist(r);
        Recruteur recru = new Recruteur(r.getLastName(), r.getFirstName(), r.getEmail()) ;
        recruteurBean.ajouterRecruteur(recru);
        Offre o = new Offre();
        o.setDateLimite(new Date(118,12,10));
        o.setDescription("Stage dan le développement java avec une équipe de 5 personnes");
        c1.getOffres().add(o);
        c2.getOffres().add(o);
        o.setTypeContrat("Stage");
        o.setIntitule("Recherche stagiaire Développement JAVA");
        o.setNiveauRequis("Master Informatique");
        o.setSalaireMin(1000);
        o.setSalaireMax(1000);
        o.setMission("Developpement de module supplémentaire sur un application de gestion de personnes");
        o.setRecruteur(recru);
        offreBean.creerOffre(o);

        em.flush();



    }

}
