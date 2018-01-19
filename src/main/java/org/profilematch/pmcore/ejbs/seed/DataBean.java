package org.profilematch.pmcore.ejbs.seed;

import org.profilematch.pmcore.entities.Competence;

import javax.annotation.PostConstruct;
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
    }

}
