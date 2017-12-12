/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.profilematch.pmcore.ejbs;

import org.profilematch.pmcore.entities.Offre;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 *
 * @author Remy
 */
@Stateless
@LocalBean
public class OffreBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;

    /**
     * Persists a given Offre
     * @param offre
     */
    public void creerOffre(Offre offre){
        em.persist(offre);
    }

    /**
     * Updated the given Offre
     * @param offre
     * @return the updated Offre
     */
    public Offre modifierOffre(Offre offre){
        em.merge(offre);
        return offre;
    }

    /**
     *
     * @param id
     * @return the Offre corresponding to the given id
     */
    public Offre getOffre(String id){
        return em.find(Offre.class, id);
    }

    /**
     *
     * @return all Offres
     */
    public List<Offre> getOffres(){
        return em.createNamedQuery("Offre.findAll", Offre.class).getResultList();
    }



}
