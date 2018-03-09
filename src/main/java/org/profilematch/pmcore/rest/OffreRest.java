package org.profilematch.pmcore.rest;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.jaxrs.PATCH;
import org.profilematch.pmcore.ejbs.CandidatBean;
import org.profilematch.pmcore.ejbs.OffreBean;
import org.profilematch.pmcore.ejbs.UserBean;
import org.profilematch.pmcore.entities.Candidat;
import org.profilematch.pmcore.entities.Competence;
import org.profilematch.pmcore.entities.Offre;
import org.profilematch.pmcore.entities.User;
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

/**
 * @author remy
 */
@Path("offres")
@Api(value= "Offres")
@Consumes("application/json")
@Produces("application/json")
public class OffreRest {

    @EJB
    private OffreBean offreBean;

    @Inject
    private KeyGenerator keyGenerator;

    @EJB
    private UserBean userBean;

    @Context
    private UriInfo uriInfo;

    @EJB
    private CandidatBean candidatBean;

    @GET
    @ApiOperation(value="Retourne toutes les offres", notes="Retourne une réponse au client")
    public Response getAll(){
        return Response.ok(offreBean.getOffres()).build();
    }

    @GET
    @ApiOperation(value="Retourne l'offre spécifiée")
    @Path("/{id}")
    public Response getOne(@PathParam("id") String id){
        return Response.ok(offreBean.getOffre((long) Integer.parseInt(id))).build();
    }

    @GET
    @JWTTokenNeeded
    @ApiOperation(value="Retourne les utilisateurs dont les compétences correspondent à l'offre renseignée")
    @Path("/{id}/utilisateurs")
    public Response getCandidatByCompetenceWithOffre(@PathParam("id") String id,
                                                     @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        Offre o = offreBean.getOffre((long) Integer.parseInt(id));
        Collection<Candidat> list = new LinkedHashSet<Candidat>(); // Faire une hashmap et ensuite trier pour voir le candidat qui correspond le plus
        for(Competence c : o.getCompetences()){
            list.addAll(c.getCandidats());
        }
        return Response.ok(list).header("Authorization", "Bearer "+token).build();
    }

    @GET
    @JWTTokenNeeded
    @Path("{id}/postulants")
    public Response getPostulants(@PathParam("id") Long id,
                                  @HeaderParam("Authorization") String header){
        String token = refreshToken(header);
        return Response.ok(offreBean.getOffre(id).getCandidats()).header("Authorization", "Bearer "+token).build();
    }

    @PUT
    @JWTTokenNeeded
    @Produces("application/json")
    @Path("suspendre/{id}")
    public Response suspendreOffre(@PathParam("id") long id,
                                   @HeaderParam("Authorization") String header){
        String token = refreshToken(header);
        Offre o = offreBean.getOffre(id);
        o.setSuspendre();
        offreBean.modifierOffre(o);
        return Response.ok(o).header("Authorization", "Bearer "+token).build();
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
