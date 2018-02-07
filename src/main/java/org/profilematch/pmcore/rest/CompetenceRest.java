package org.profilematch.pmcore.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.json.JSONObject;
import org.profilematch.pmcore.ejbs.CompetenceBean;
import org.profilematch.pmcore.entities.Competence;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

/**
 * @author remy
 */
@Path("competence")
@Api(value = "Competence")
public class CompetenceRest {

    @EJB
    private CompetenceBean competenceBean;

    @GET
    @ApiOperation(value = "Retourne toutes les compétences", notes= "Retourne du json au client")
    @Produces("application/json")
    public Response getAll(){
        return Response.ok(competenceBean.getCompetences()).build();
    }

    @GET
    @ApiOperation(value = "Retourne la compétence demandée", notes="Retourne du json au client")
    @Produces("application/json")
    @Path("{id}")
    public Response getOne(@PathParam("id") String id){
        return Response.ok(competenceBean.getCompetence((long) Integer.parseInt(id))).build();
    }

    @POST
    @ApiOperation(value="Permet d'ajouter une compétence selon certains paramètres", notes="Le client envoie du json et le serveur renvoie du json")
    @Consumes("application/json")
    public Response addCompetence(Competence competence){
        competenceBean.ajouterCompetence(competence);
        return Response.ok(competence).build();
    }

    @PUT
    @ApiOperation(value="Modifie la compétence demandée", notes="Retourne une réponse au client")
    @Consumes("application/json")
    public Response modifierCompetence(Competence competence){
        competenceBean.modifierCompetence(competence);
        return Response.ok(competence).build();
    }

    @DELETE
    @Path("{id}")
    public Response deleteCompetence(@PathParam("id") Long id){
        competenceBean.supprimerCompetence(id);
        return Response.ok().build();
    }
}
