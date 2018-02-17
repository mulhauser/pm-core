package org.profilematch.pmcore.ejbs;


import org.profilematch.pmcore.entities.Experience;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
@LocalBean
public class ExperienceBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;


    public void ajouterExperience(Experience e){
        em.persist(e);
    }

    public Experience getExperience(Long id){
        return em.find(Experience.class, id);
    }

    public List<Experience> getExperiences(){
        return em.createNamedQuery("Experience.findAll", Experience.class).getResultList();
    }

    public void updateExperience(Experience e){
        em.merge(e);
    }

    public void deleteExperience(Long  id){
        em.remove(em.getReference(Experience.class, id));
    }

    public List<Experience> getExperiencesByCle(String cle){
        return em.createNamedQuery("Experience.findByCle", Experience.class)
                .setParameter("keyword", "%"+cle+"%")
                .getResultList();
    }

}
