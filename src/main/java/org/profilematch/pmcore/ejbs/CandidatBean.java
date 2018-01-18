package org.profilematch.pmcore.ejbs;


import org.profilematch.pmcore.entities.Candidat;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
@LocalBean
public class CandidatBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;

    public void ajouterCandidat(Candidat c){
        em.persist(c);
    }

    public void modifierCandidat(Candidat c){
        em.merge(c);
    }

    public Candidat getCandidat(Long id){
       return em.find(Candidat.class, id);
    }

    public List<Candidat> getCandidats(){
        return em.createNamedQuery("Candidat.findAll", Candidat.class).getResultList();
    }

    public void supprimerCandidat(Candidat c){
        em.remove(em.merge(c));
    }

}
