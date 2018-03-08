package org.profilematch.pmcore.ejbs;

import org.profilematch.pmcore.entities.Profil;
import org.profilematch.pmcore.entities.Recruteur;
import org.profilematch.pmcore.entities.User;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * @author remy
 */
@Stateless
@LocalBean
public class UserBean {

    @PersistenceContext(unitName = "IMP_PU")
    EntityManager em;

    public User modifierUser(User c){
        return em.merge(c);
    }

    public User getUserByEmail(String email){
        TypedQuery<User> query = em.createNamedQuery(User.FIND_BY_EMAIL, User.class);
        query.setParameter("email", email);
        User p = query.getSingleResult();
        return p;
    }
}
