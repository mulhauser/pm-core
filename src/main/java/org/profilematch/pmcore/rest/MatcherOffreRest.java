package org.profilematch.pmcore.rest;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.CandidatBean;
import org.profilematch.pmcore.ejbs.MatcherBean;
import org.profilematch.pmcore.ejbs.UserBean;
import org.profilematch.pmcore.entities.*;
import org.profilematch.pmcore.jwt.JWTTokenNeeded;
import org.profilematch.pmcore.utils.JwtUtil;
import org.profilematch.pmcore.utils.KeyGenerator;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.security.Key;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;

/**
 * @author titem
 */

@Path("matcherOffre")
@Api(value= "matcherOffre")
@Consumes("application/json")
@Produces("application/json")
public class MatcherOffreRest {

    @EJB
    MatcherBean matcherBean;

    @Inject
    private KeyGenerator keyGenerator;

    @EJB
    private UserBean userBean;

    @Context
    private UriInfo uriInfo;

    @EJB
    private CandidatBean candidatBean;

    @GET
    @JWTTokenNeeded
    @ApiOperation(value="Retourne la liste des candidats avec pondération de leur correspondance à l'offre", notes="Retourne une réponse au client")
    @Path("/{id}/{avecExperience}")
    public Response getCandidatByOffre(@PathParam("id") String id,@PathParam("avecExperience") Boolean exp,
                                       @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        List<CandidatPondere> list = matcherBean.matcherCandidatExperimentes((long) Integer.parseInt(id), exp);
        return Response.ok(list).header("Authorization", "Bearer "+token).build();
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
