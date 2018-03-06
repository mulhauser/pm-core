package org.profilematch.pmcore.ejbs.seed;

import org.profilematch.pmcore.ejbs.CandidatBean;
import org.profilematch.pmcore.ejbs.CompetenceBean;
import org.profilematch.pmcore.ejbs.ExperienceBean;
import org.profilematch.pmcore.ejbs.RecruteurBean;
import org.profilematch.pmcore.entities.Candidat;
import org.profilematch.pmcore.entities.Competence;
import org.profilematch.pmcore.entities.Recruteur;
import org.profilematch.pmcore.entities.User;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
        candidatBean.ajouterCandidat(new Candidat(c.getLastName(), c.getFirstName(), c.getEmail()));


        User r = new User();
        r.setEmail("recruteur@gmail.com");
        r.setFirstName("PrenomRecru");
        r.setLastName("NomRecru");
        r.setPassword("test");
        r.setType("recruteur");
        em.persist(r);
        recruteurBean.ajouterRecruteur(new Recruteur(r.getLastName(), r.getFirstName(), r.getEmail()));

        em.flush();



    }

}
