package org.profilematch.pmcore.ejbs;


import org.profilematch.pmcore.entities.*;
import org.profilematch.pmcore.utils.PasswordUtils;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
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

    public Profil getCandidatByEmail(String email){
        TypedQuery<Profil> query = em.createNamedQuery("Profil.findByEmail", Profil.class);
        query.setParameter("email", email);
        Profil p = query.getSingleResult();

        Collections.sort((List)((Candidat) p).getExperiences(), new Comparator<Experience>(){
            @Override
            public int compare(Experience o1, Experience o2) {
                return o2.getDateDebut().compareTo(o1.getDateDebut());
            }
        });


        return p;
    }

}
