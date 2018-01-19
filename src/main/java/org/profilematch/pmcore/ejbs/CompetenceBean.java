package org.profilematch.pmcore.ejbs;

import org.profilematch.pmcore.entities.Competence;
import org.profilematch.pmcore.entities.Experience;

import javax.annotation.PostConstruct;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * @author remy
 */

@Stateless
@LocalBean
public class CompetenceBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;

    public void ajouterCompetence(Competence competence){
        em.persist(competence);
    }

    public void modifierCompetence(Competence competence){
        em.merge(competence);
    }

    public Competence getCompetence(Long id){
        return em.find(Competence.class, id);
    }

    public List<Competence> getCompetences(){
        return em.createNamedQuery("Competence.findAll", Competence.class).getResultList();
    }

    public void supprimerCompetence(Competence competence){
        em.remove(em.merge(competence));
    }

    public EntityManager getEm() {
        return em;
    }
}
