package org.profilematch.pmcore.ejbs;

import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.LocalBean;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.profilematch.pmcore.entities.Users;


/**
 * Exemple
 * @author Flavien
 */
@Stateless
@LocalBean
public class UtilisateursBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;

    /**
     * Persists a the given Utilisateur
     *
     * @param u
     * @return the persisted Utilisateur
     */
    public boolean inscrireUtilisateur(Users u) {
        em.persist(u);
        return true;
    }

    /**
     * Updated the given Utilisateur
     *
     * @param u
     * @return the updated Utilisateur
     */
    public boolean modifierUtilisateur(Users u) {
        Users nouveauU = em.find(Users.class, u.getEmail());
        if (nouveauU != null) {
            em.merge(u);
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     * @param id
     * @return the Utilisateur corresponding to the given id
     */
    public Users getUtilisateur(String id){
        Users u = em.find(Users.class, id);
        if (u != null) {
            return u;
        } else {
            return new Users((long)-1, "", "", "");
        }
    }

    /**
     *
     * @param email
     * @return the Utilisateur corresponding to the given email
     */
    public Users getUtilisateurByEmail(String email){
        Users rep = new Users((long)-1, "", "", "");

        Users u = em.find(Users.class, email);
        //  u = (Users) em.createQuery("Users.findByEmail")
        //      .setParameter("email", email).getSingleResult();
        if (u != null) {
            rep = u;
        }
        return rep;
    }

    /**
     *
     * @return all the Utilisateurs
     */
    public List<Users> getUtilisateurs(){
        return em.createNamedQuery("Users.findAll").getResultList();
    }

    public Users connexion(String email, String hache){
        Users user = getUtilisateurByEmail(email);
        Users u = new Users((long)-1, "", "", "");
        if(user.getId() != -1){
            if(user.getMotdepasse() != null){
                if(!user.getMotdepasse().equals(hache)){
                    user = new Users((long)-1, "", "", "");
                }else{
                    u = new Users(user);
                    u.setMotdepasse("");
                }
            }
        }
        return u;
    }
}