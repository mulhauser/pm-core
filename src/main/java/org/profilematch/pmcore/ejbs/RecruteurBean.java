package org.profilematch.pmcore.ejbs;

import org.profilematch.pmcore.entities.Candidat;
import org.profilematch.pmcore.entities.Profil;
import org.profilematch.pmcore.entities.Recruteur;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
@LocalBean
public class RecruteurBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;

    public void ajouterRecruteur(Recruteur c){
        em.persist(c);
    }

    public Recruteur modifierRecruteur(Recruteur c){
        return em.merge(c);
    }

    public Recruteur getRecruteur(Long id){
        return em.find(Recruteur.class, id);
    }

    public List<Profil> getRecruteurs(){
        return em.createNamedQuery("Profil.findAllR", Profil.class).getResultList();
    }

    public void supprimerRecruteur(Long id){
        em.remove(em.getReference(Profil.class, id));
    }

    public Profil getRecruteurByEmail(String email){
        TypedQuery<Profil> query = em.createNamedQuery("Profil.findByEmail", Profil.class);
        query.setParameter("email", email);
        Profil p = query.getSingleResult();
        return p;
    }
}
