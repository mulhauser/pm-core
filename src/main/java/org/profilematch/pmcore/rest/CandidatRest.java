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
public class CandidatRest {

    @EJB
    private CandidatBean candidatBean;

    @EJB
    private ExperienceBean experienceBean;

    @EJB
    private CompetenceBean competenceBean;

    @GET
    @Produces("application/json")
    @ApiOperation(value="Retourne tous les candidats")
    public Response getAll(){
        return Response.ok(candidatBean.getCandidats()).build();
    }

    @GET
    @Path("/{id}")
    @Produces("application/json")
    @ApiOperation(value="Retourne le candidat avec l'id renseigné")
    public Response getById(@PathParam("id") String id){
        return Response.ok(candidatBean.getCandidat((long) Integer.parseInt(id))).build();
    }

    @GET
    @Path("/findByEmail/{email}")
    @Produces("application/json")
    @ApiOperation(value="Retourne le candidat avec l'email renseigné")
    public Response getByEmail(@PathParam("email") String email){
        return Response.ok(candidatBean.getCandidatByEmail(email)).build();
    }

    @GET
    @Path("/{id}/experiences")
    @Produces("application/json")
    @ApiOperation(value="Retourne les expériences du candidat renseigné")
    public Response getExperiences(@PathParam("id") String id){
        return Response.ok(candidatBean.getCandidat((long) Integer.parseInt(id)).getExperiences()).build();
    }

    @GET
    @Path("/{id}/competences")
    @Produces("application/json")
    @ApiOperation(value="Retourne les compétences du candidat renseigné")
    public Response getCompetences(@PathParam("id") String id){
        return Response.ok(candidatBean.getCandidat((long) Integer.parseInt(id)).getCompetences()).build();
    }

    @POST
    @Path("/{id}/experiences")
    @Consumes("application/json")
    @ApiOperation(value="Ajoute une experience au candidat renseigné")
    public Response addExperience(@PathParam("id") String id, Experience experience){
        experience.setCandidat(candidatBean.getCandidat((long) Integer.parseInt(id)));
        experienceBean.ajouterExperience(experience);
        return Response.ok().build();
    }

    @POST
    @Path("/{id}/competences/{idCompetence}")
    @Consumes("application/json")
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
    @Consumes("application/json")
    @ApiOperation(value="Modifie un candidat")
    public Response update(Candidat candidat){
        return Response.ok(candidatBean.modifierCandidat(candidat)).build();
    }

    @DELETE
    @Path("/{id}")
    @Consumes("application/json")
    @ApiOperation(value="Supprime un candidat")
    public Response delete(@PathParam("id") String id) {
        candidatBean.supprimerCandidat((long) Integer.parseInt(id));
        return Response.ok().build();
    }
}
