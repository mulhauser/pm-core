package org.profilematch.pmcore.rest;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import org.profilematch.pmcore.ejbs.CandidatBean;
import org.profilematch.pmcore.ejbs.Mail;
import org.profilematch.pmcore.ejbs.UserBean;
import org.profilematch.pmcore.entities.User;
import org.profilematch.pmcore.jwt.JWTTokenNeeded;
import org.profilematch.pmcore.utils.JwtUtil;
import org.profilematch.pmcore.utils.KeyGenerator;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.security.Key;

@Path("serviceMail")
@Api(value = "Mail")
public class MailRest {

    @EJB
    private Mail mail;

    @Inject
    private KeyGenerator keyGenerator;

    @EJB
    private UserBean userBean;

    @Context
    private UriInfo uriInfo;

    @EJB
    private CandidatBean candidatBean;

    @POST
    @JWTTokenNeeded
    @Path("envoyer")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response envoyerMail(String mails,
                                @HeaderParam("Authorization") String header){
        String token = refreshToken(header);
        String res ;
        try {
            res = mail.envoyer(mails);
        } catch (Exception ex) {
            return Response.status(201).build();
        }
        return Response.ok(res).header("Authorization", "Bearer "+token).build();
    }

    public String refreshToken(String tok){
        String token = tok.substring("Bearer".length()).trim();

        Key key = keyGenerator.generateKey();
        Jwts.parser().setSigningKey(key).parseClaimsJws(token);
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token).getBody();

        TypedQuery<User> query = candidatBean.getEm().createNamedQuery(User.FIND_BY_EMAIL, User.class);
        query.setParameter("email", claims.getSubject());
        User user = query.getSingleResult();
        String newToken = JwtUtil.issueToken(keyGenerator, uriInfo, claims.getSubject());
        user.setToken(newToken);
        userBean.modifierUser(user);
        return newToken;
    }
}
