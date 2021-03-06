package org.profilematch.pmcore.rest;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.*;
import org.profilematch.pmcore.entities.*;
import org.profilematch.pmcore.jwt.JWTTokenNeeded;
import org.profilematch.pmcore.utils.JwtUtil;
import org.profilematch.pmcore.utils.KeyGenerator;
import org.profilematch.pmcore.utils.PasswordUtils;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.security.Key;
import java.util.Collection;
import java.util.LinkedHashSet;


@Path("candidat")
@Api(value = "Candidat")
@Consumes("application/json")
@Produces("application/json")
public class CandidatRest {

    @EJB
    private ExperienceBean experienceBean;

    @EJB
    private CompetenceBean competenceBean;

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
    @ApiOperation(value="Retourne tous les candidats")
    public Response getAll(){
        return Response.ok(candidatBean.getCandidats()).build();
    }

    @GET
    @Path("/{id}")
    @ApiOperation(value="Retourne le candidat avec l'id renseigné")
    public Response getById(@PathParam("id") String id){
        return Response.ok(candidatBean.getCandidat((long) Integer.parseInt(id))).build();

    }

    @GET
    @Path("/findByEmail/{email}")
    @ApiOperation(value="Retourne le candidat avec l'email renseigné")
    public Response getByEmail(@PathParam("email") String email,
                               @HeaderParam("Authorization") String header){
        Profil c = candidatBean.getCandidatByEmail(email);
        String token = refreshToken(header);
        return Response.ok(c).header("Authorization", "Bearer "+token).build();
    }

    @GET
    @Path("/{id}/experiences")
    @ApiOperation(value="Retourne les expériences du candidat renseigné")
    public Response getExperiences(@PathParam("id") String id){
        return Response.ok(candidatBean.getCandidat((long) Integer.parseInt(id)).getExperiences()).build();
    }

    @GET
    @Path("/{id}/competences")
    @ApiOperation(value="Retourne les compétences du candidat renseigné")
    public Response getCompetences(@PathParam("id") String id){
        return Response.ok(candidatBean.getCandidat((long) Integer.parseInt(id)).getCompetences()).build();
    }

    @POST
    @JWTTokenNeeded
    @Path("/{id}/experiences")
    @ApiOperation(value="Ajoute une experience au candidat renseigné")
    public Response addExperience(@PathParam("id") String id, Experience experience,
                                  @HeaderParam("Authorization") String header){
        Candidat c = candidatBean.getCandidat((long) Integer.parseInt(id));
        experience.setCandidat(c);

        String token = refreshToken(header);

        experienceBean.ajouterExperience(experience);
        return Response.ok().header("Authorization", "Bearer "+token).build();
    }

    @POST
    @JWTTokenNeeded
    @Path("/{id}/competences/{idCompetence}")
    @ApiOperation(value="Ajoute une competence au candidat renseigné")
    public Response addCompetence(@PathParam("id") String id, @PathParam("idCompetence") int idCompetence,
                                  @HeaderParam("Authorization") String header){
        Competence competence = competenceBean.getCompetence((long) idCompetence);
        Candidat candidat = candidatBean.getCandidat((long) Integer.parseInt(id));

        String token = refreshToken(header);

        competence.getCandidats().add(candidat);
        candidat.getCompetences().add(competence);

        competenceBean.modifierCompetence(competence);
        return Response.ok().header("Authorization", "Bearer "+token).build();
    }

    @DELETE
    @JWTTokenNeeded
    @Path("/{id}/competences/{idCompetence}")
    @ApiOperation(value="Supprimer une competence au candidat renseigné")
    public Response supprimerCompetence(@PathParam("id") String id, @PathParam("idCompetence") int idCompetence,
                                        @HeaderParam("Authorization") String header){
        Competence competence = competenceBean.getCompetence((long) idCompetence);
        Candidat candidat = candidatBean.getCandidat((long) Integer.parseInt(id));

        String token = refreshToken(header);

        competence.getCandidats().remove(candidat);
        candidat.getCompetences().remove(competence);

        competenceBean.modifierCompetence(competence);
        return Response.ok().header("Authorization", "Bearer "+token).build();
    }

    @PUT
    @JWTTokenNeeded
    @ApiOperation(value="Modifie un candidat")
    public Response update(Candidat candidat,
                           @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        Candidat c = candidatBean.modifierCandidat(candidat);

        return Response.ok(c).header("Authorization", "Bearer "+token).build();
    }

    @DELETE
    @JWTTokenNeeded
    @Path("/{id}")
    @ApiOperation(value="Supprime un candidat")
    public Response delete(@PathParam("id") Long id,
                           @HeaderParam("Authorization") String header) {
        String token = refreshToken(header);

        Candidat c = candidatBean.getCandidat(id);
        for(Competence comp : c.getCompetences()) {
            comp.getCandidats().remove(c);
            competenceBean.modifierCompetence(comp);
        }
        candidatBean.supprimerCandidat(id);
        return Response.ok().header("Authorization", "Bearer "+token).build();
    }

    @GET
    @Path("/{id}/offres")
    @ApiOperation(value="Retourne les offres où le candidat spécifié a postulé")
    public Response getOffres(@PathParam("id") String id){
        return Response.ok(candidatBean.getCandidat((long) Integer.parseInt(id)).getOffres()).build();
    }

    @GET
    @Path("/{id}/bestOffres")
    @ApiOperation(value = "Retourne les offres qui correspondent au candidat spécifié")
    public Response getBestOffres(@PathParam("id") String id){
        Candidat candidat = candidatBean.getCandidat((long) Integer.parseInt(id));
        Collection<Competence> competences = candidat.getCompetences();
        Collection<Offre> offres = new LinkedHashSet<Offre>();
        for(Competence c : competences){
            offres.addAll(c.getOffres());
        }
        return Response.ok(offres).build();
    }

    @POST
    @JWTTokenNeeded
    @Path("/{id}/offres")
    @ApiOperation(value="Le candidat postule à l'offre concernée")
    public Response updateOffre(@PathParam("id") String id, Offre offre,
                                @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        Candidat candidat = candidatBean.getCandidat((long) Integer.parseInt(id));
        candidat.getOffres().add(offre);
        offre.getCandidats().add(candidat);

        candidatBean.modifierCandidat(candidat);
        offreBean.modifierOffre(offre);
        return Response.ok(candidat).header("Authorization", "Bearer "+token).build();
    }

    @PUT
    @JWTTokenNeeded
    @Produces("application/json")
    @Path("suspendre/{id}")
    public Response suspendreCandidat(@PathParam("id") long id,
                                      @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        Candidat candidat = candidatBean.getCandidat(id);
        candidat.setSuspendre();
        candidatBean.modifierCandidat(candidat);
        return Response.ok(candidat).header("Authorization", "Bearer "+token).build();
    }

    @DELETE
    @JWTTokenNeeded
    @Path("/{id}/offres/{idOffre}")
    @ApiOperation(value="Le candidat supprime sa postulation")
    public Response deleteOffre(@PathParam("id") String id, @PathParam("id") Long idOffre,
                                @HeaderParam("Authorization") String header){
        String token = refreshToken(header);

        Candidat candidat = candidatBean.getCandidat((long) Integer.parseInt(id));
        Offre o = offreBean.getOffre(idOffre);
        candidat.getOffres().remove(o);
        o.getCandidats().remove(candidat);

        candidatBean.modifierCandidat(candidat);
        offreBean.modifierOffre(o);
        return Response.ok(candidat).header("Authorization", "Bearer "+token).build();
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
