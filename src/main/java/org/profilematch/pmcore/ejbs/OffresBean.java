package org.profilematch.pmcore.ejbs;

import org.profilematch.pmcore.entities.Offres;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * @author remy
 */
@Stateless
@LocalBean
public class OffresBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;

    public void ajouterOffre(Offres o){
        em.persist(o);
    }

    public void modifierOffre(Offres o){
        em.merge(o);
    }

    public void supprimerOffre(Offres o){
        em.remove(em.merge(o));
    }

    public List<Offres> getOffres(){
        return em.createNamedQuery("Offres.findAll").getResultList();
    }

    public Offres getOffreParIntitule(String intitule){
        return em.find(Offres.class, intitule);
    }


}
