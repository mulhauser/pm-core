package org.profilematch.pmcore.ejbs;


import org.profilematch.pmcore.entities.Experience;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Stateless
@LocalBean
public class ExperienceBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;


    public void ajouterExperience(Experience e){
        em.persist(e);
    }

    public void updateExperience(Experience e){
        em.merge(e);
    }

    public void deleteExperience(Experience e){
        em.remove(em.merge(e));
    }
}
