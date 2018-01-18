package org.profilematch.pmcore.ejbs;


import org.profilematch.pmcore.entities.Candidat;
import org.profilematch.pmcore.entities.Profil;

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

    public Candidat modifierCandidat(Candidat c){
        return em.merge(c);
    }

    public Candidat getCandidat(Long id){
       return em.find(Candidat.class, id);
    }

    public List<Profil> getCandidats(){
        return em.createNamedQuery("Profil.findAllC", Profil.class).getResultList();
    }

    public void supprimerCandidat(Long id){
        em.remove(em.getReference(Profil.class, id));
    }

}
