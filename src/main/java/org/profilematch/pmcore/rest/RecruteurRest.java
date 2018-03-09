package org.profilematch.pmcore.rest;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.CandidatBean;
import org.profilematch.pmcore.ejbs.OffreBean;
import org.profilematch.pmcore.ejbs.RecruteurBean;
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

@Path("recruteur")
@Api(value = "Recruteur")
@Produces("application/json")
@Consumes("application/json")
public class RecruteurRest {

    @EJB
    private RecruteurBean recruteurBean;

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
    @ApiOperation(value="Retourne tous les recruteurs")
    public Response getAll(){
        return Response.ok(recruteurBean.getRecruteurs()).build();
    }

    @GET
    @Path("/{id}")
    @ApiOperation(value="Retourne le recruteur avec l'id renseigné")
    public Response getById(@PathParam("id") String id){
        return Response.ok(recruteurBean.getRecruteur((long) Integer.parseInt(id))).build();
    }

    @GET
    @Path("/findByEmail/{email}")
    @ApiOperation(value="Retourne le recruteur avec l'email renseigné")
    public Response getByEmail(@PathParam("email") String email){
        return Response.ok(recruteurBean.getRecruteurByEmail(email)).build();
    }


    @PUT
    @JWTTokenNeeded
    @ApiOperation(value="Modifie un recruteur")
    public Response update(Recruteur recruteur,
                           @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        return Response.ok(recruteurBean.modifierRecruteur(recruteur)).header("Authorization", "Bearer "+token).build();
    }

    @DELETE
    @JWTTokenNeeded
    @Path("/{id}")
    @ApiOperation(value="Supprime un recruteur")
    public Response delete(@PathParam("id") long id,
                           @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        recruteurBean.supprimerRecruteur(id);
        return Response.ok().header("Authorization", "Bearer "+token).build();
    }

    @GET
    @Path("/{id}/offres")
    @ApiOperation(value="Retourne les offres que le recruteur a créé")
    public Response getOffres(@PathParam("id") String id){
        return Response.ok(recruteurBean.getRecruteur((long) Integer.parseInt(id)).getOffres()).build();
    }

    @POST
    @JWTTokenNeeded
    @Path("/{id}/offres")
    @ApiOperation(value="Permet au recruteur de créer une offre")
    public Response addOffre(@PathParam("id") String id, Offre offre,
                             @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        offre.setRecruteur(recruteurBean.getRecruteur((long) Integer.parseInt(id)));
        offreBean.creerOffre(offre);
        return Response.ok(offre).header("Authorization", "Bearer "+token).build();
    }

    @PUT
    @Produces("application/json")
    @Path("suspendre/{id}")
    public Response suspendreRecruteur(@PathParam("id") long id){
        Recruteur r = recruteurBean.getRecruteur(id);
        r.setSuspendre();
        recruteurBean.modifierRecruteur(r);
        return Response.ok(r).build();
    }

    @PUT
    @JWTTokenNeeded
    @Path("/{id}/offres")
    @ApiOperation(value = "Permet au recruteur de modifier une offre")
    public Response modifierOffre(@PathParam("id") String id, Offre offre,
                                  @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        Recruteur recruteur = recruteurBean.getRecruteur((long) Integer.parseInt(id));
        if(offre.getRecruteur().equals(recruteur)){
            offreBean.modifierOffre(offre);
        }
        return Response.ok(offre).header("Authorization", "Bearer "+token).build();
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
