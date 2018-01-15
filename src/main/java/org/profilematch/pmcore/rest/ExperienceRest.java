package org.profilematch.pmcore.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.json.JSONObject;
import org.profilematch.pmcore.ejbs.CompetenceBean;
import org.profilematch.pmcore.ejbs.ExperienceBean;
import org.profilematch.pmcore.entities.Competence;
import org.profilematch.pmcore.entities.Experience;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

/**
 * @author remy
 */
@Path("experience")
@Api(value = "Expérience")
public class ExperienceRest {

    @EJB
    private ExperienceBean experienceBean;

    @GET
    @ApiOperation(value = "Retourne toutes les expériences", notes= "Retourne une réponse au client")
    @Produces("application/json")
    public Response getAll(){
        return Response.ok(experienceBean.getExperiences()).build();
    }

    @GET
    @ApiOperation(value = "Retourne l'expérience demandée", notes="Retourne une réponse au client")
    @Produces("application/json")
    @Path("{id}")
    public Response getOne(@PathParam("id") Long id){
        return Response.ok(experienceBean.getExperience(id)).build();
    }

    @POST
    @ApiOperation(value="Permet d'ajouter une expérience selon certains paramètres", notes="Retourne une réponse au client")
    @Consumes("application/json")
    public Response addExperience(Experience experience){
        experience.setId(null);
        experience.setCandidat(null);
        experienceBean.ajouterExperience(experience);
        return Response.ok(experience).build();
    }

    @PUT
    @ApiOperation(value="Modifie l'expérience demandée", notes="Retourne une réponse au client")
    @Consumes("application/json")
    public Response modifierCompetence(Experience experience){
        experience.setCandidat(null);
        experienceBean.updateExperience(experience);
        return Response.ok(experience).build();
    }
}
