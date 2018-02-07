package org.profilematch.pmcore.rest;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.CandidatBean;
import org.profilematch.pmcore.ejbs.CompetenceBean;
import org.profilematch.pmcore.ejbs.ExperienceBean;
import org.profilematch.pmcore.entities.Candidat;
import org.profilematch.pmcore.entities.Competence;
import org.profilematch.pmcore.entities.Experience;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;


@Path("candidat")
@Api(value = "Candidat")
@Consumes("application/json")
@Produces("application/json")
public class CandidatRest {

    @EJB
    private CandidatBean candidatBean;

    @EJB
    private ExperienceBean experienceBean;

    @EJB
    private CompetenceBean competenceBean;

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
    public Response getByEmail(@PathParam("email") String email){
        return Response.ok(candidatBean.getCandidatByEmail(email)).build();
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
    @Path("/{id}/experiences")
    @ApiOperation(value="Ajoute une experience au candidat renseigné")
    public Response addExperience(@PathParam("id") String id, Experience experience){
        experience.setCandidat(candidatBean.getCandidat((long) Integer.parseInt(id)));
        experienceBean.ajouterExperience(experience);
        return Response.ok().build();
    }

    @POST
    @Path("/{id}/competences/{idCompetence}")
    @ApiOperation(value="Ajoute une competence au candidat renseigné")
    public Response addCompetence(@PathParam("id") String id, @PathParam("idCompetence") int idCompetence){
        Competence competence = competenceBean.getCompetence((long) idCompetence);
        Candidat candidat = candidatBean.getCandidat((long) Integer.parseInt(id));

        competence.getCandidats().add(candidat);
        candidat.getCompetences().add(competence);

        competenceBean.modifierCompetence(competence);
        //candidatBean.getCandidat((long) Integer.parseInt(id)).getCompetences().add(competence);
        // competence.setCandidat(candidatBean.getCandidat((long) Integer.parseInt(id)));
        // competenceBean.ajouterExperience(competence);
        return Response.ok().build();
    }

    @PUT
    @ApiOperation(value="Modifie un candidat")
    public Response update(Candidat candidat){
        return Response.ok(candidatBean.modifierCandidat(candidat)).build();
    }

    @DELETE
    @Path("/{id}")
    @ApiOperation(value="Supprime un candidat")
    public Response delete(@PathParam("id") String id) {
        candidatBean.supprimerCandidat((long) Integer.parseInt(id));
        return Response.ok().build();
    }

    @GET
    @Path("/{id}/offres")
    @ApiOperation(value="Retourne les offres où le candidat spécifié a postulé")
    public Response getOffres(@PathParam("id") String id){
        return Response.ok(candidatBean.getCandidat((long) Integer.parseInt(id)).getOffres()).build();
    }
}
