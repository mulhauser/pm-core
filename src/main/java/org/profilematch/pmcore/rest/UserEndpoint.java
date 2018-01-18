package org.profilematch.pmcore.rest;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.Api;
import org.hibernate.HibernateException;
import org.hibernate.exception.ConstraintViolationException;
import org.profilematch.pmcore.ejbs.CandidatBean;
import org.profilematch.pmcore.entities.Candidat;
import org.profilematch.pmcore.entities.User;
import org.profilematch.pmcore.utils.KeyGenerator;
import org.profilematch.pmcore.utils.PasswordUtils;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.security.Key;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.MediaType.APPLICATION_FORM_URLENCODED;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.Status.NOT_FOUND;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;

/**
 * @author Antonio Goncalves
 *         http://www.antoniogoncalves.org
 *         --
 */
@Path("/users")
@Api(value = "user")
@Produces(APPLICATION_JSON)
@Consumes(APPLICATION_JSON)
@Transactional
public class UserEndpoint {

    // ======================================
    // =          Injection Points          =
    // ======================================
    @Inject
    private KeyGenerator keyGenerator;

    @Context
    private UriInfo uriInfo;

    @Inject
    private Logger logger;

    @PersistenceContext
    private EntityManager em;

    @EJB
    private CandidatBean candidatBean;

    // ======================================
    // =          Business methods          =
    // ======================================

    @POST
    @Path("/login")
    @Consumes("application/json")
    @Produces("application/json")
    public Response authenticateUser(User user) {

        try {

            logger.info("#### email/password : " + user.getEmail() + "/" + user.getPassword());

            // Authenticate the user using the credentials provided
            user = authenticate(user.getEmail(), user.getPassword());
            // Issue a token for the user
            String token = issueToken(user.getFirstName());
            // Return the token on the response
            user.setToken(token);
            return Response.ok(user).header(AUTHORIZATION, "Bearer " + token).build();

        } catch (Exception e) {
            return Response.status(UNAUTHORIZED).build();
        }
    }

    private User authenticate(String email, String password) throws Exception {


        TypedQuery<User> query = em.createNamedQuery(User.FIND_BY_EMAIL_PASSWORD, User.class);
        query.setParameter("email", email);
        query.setParameter("password", PasswordUtils.digestPassword(password));
        User user = query.getSingleResult();

        if (user == null)
            throw new SecurityException("Invalid user/password");
        return user;
    }

    private String issueToken(String login) {
        Key key = keyGenerator.generateKey();
        String jwtToken = Jwts.builder()
                .setSubject(login)
                .setIssuer(uriInfo.getAbsolutePath().toString())
                .setIssuedAt(new Date())
                .setExpiration(toDate(LocalDateTime.now().plusMinutes(15L)))
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
        logger.info("#### generating token for a key : " + jwtToken + " - " + key);
        return jwtToken;

    }

    @POST
    public Response create(User user) {
        try {
            em.persist(user);
            if(user.getType().equals("candidat")) {
                candidatBean.ajouterCandidat(new Candidat(user.getLastName(), user.getFirstName(), user.getEmail()));
            }

            em.flush();
            return Response.created(uriInfo.getAbsolutePathBuilder().path(user.getEmail()).build()).build();
        }catch(PersistenceException e){
            return Response.status(Response.Status.CONFLICT).build();
        }
    }


    @GET
    @Path("/{email}")
    public Response findById(@PathParam("email") String email) {
        User user = em.find(User.class, email);

        if (user == null)
            return Response.status(NOT_FOUND).build();

        return Response.ok(user).build();
    }

    @GET
    public Response findAllUsers() {
        TypedQuery<User> query = em.createNamedQuery(User.FIND_ALL, User.class);
        List<User> allUsers = query.getResultList();

        if (allUsers == null)
            return Response.status(NOT_FOUND).build();

        return Response.ok(allUsers).build();
    }

     @PUT
     public Response updateUser(User u){
         User user = em.find(User.class, u.getEmail());

         if (user == null)
             return Response.status(NOT_FOUND).build();
         else
             em.merge(user);
         return Response.ok(user).build();
     }

    @DELETE
    @Path("/{email}")
    public Response remove(@PathParam("email") String email) {
        em.remove(em.getReference(User.class, email));
        return Response.noContent().build();
    }

    // ======================================
    // =          Private methods           =
    // ======================================

    private Date toDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }


}