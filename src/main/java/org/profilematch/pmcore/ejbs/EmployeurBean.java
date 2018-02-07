package org.profilematch.pmcore.ejbs;

import org.profilematch.pmcore.entities.Employeur;
import org.profilematch.pmcore.entities.Experience;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
@LocalBean
public class EmployeurBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;

    public void addEmployeur(Employeur employeur){ em.persist(employeur); }

    public Employeur getEmployeur(Long id){return em.find(Employeur.class, id);}

    public List<Employeur> getListEmployeur(){
        return em.createNamedQuery("Employeur.findAll", Employeur.class).getResultList();
    }

    public void updateEmployeur(Employeur employeur){ em.merge(employeur);}

    public void deliteEmployeur(Long id){ em.remove(em.getReference(Employeur.class, id)); }

}
