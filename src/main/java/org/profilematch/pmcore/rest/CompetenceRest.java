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
@Api(value = "Competence service")
public class CompetenceRest {

    @EJB
    private CompetenceBean competenceBean;

    @GET
    @ApiOperation(value = "Retrieve some competence content", notes= "Return some json to the client")
    @Produces("application/json")
    public Response getAll(){
        // PROBLEME RETOUR AVEC ok(competenceBean.getCompetences())
        //System.out.println(competenceBean.getCompetences().get(0).getDescription());
        return Response.ok(competenceBean.getCompetences()).build();
    }

    @GET
    @Produces("application/json")
    @Path("{id}")
    public Response getOne(@PathParam("id") String id){
        return Response.ok(competenceBean.getCompetence(id)).build();
    }

    @POST
    @Consumes("application/json")
    public Response addCompetence(Competence competence){
        /*
        IL FAUT UTILISER LE TYPE COMPETENCE POUR EVITER DE SE FAIRE CHIER A TRAITER LE JSON
        JSONObject json = new JSONObject(competence);
        Competence c = new Competence(json.get("nom").toString(), json.get("description").toString());
        */
        // AVEC SWAGGER, IL FAUT METTRE L'ID A NULL
        competence.setId(null);
        competenceBean.ajouterCompetence(competence);
        return Response.ok(competence).build();
    }

    @PUT
    @Consumes("application/json")
    public Response modifierCompetence(Competence competence){
        competenceBean.modifierCompetence(competence);
        return Response.ok(competence).build();
    }
}
