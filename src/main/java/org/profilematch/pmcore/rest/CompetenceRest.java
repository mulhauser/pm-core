package org.profilematch.pmcore.rest;

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
public class CompetenceRest {

    @EJB
    private CompetenceBean competenceBean;

    @GET
    @Produces("application/json")
    public Response getAll(){
        //return Response.ok("all competences").build();
        System.out.println(competenceBean.getCompetences().get(0).getDescription());
        return Response.ok("all").build();
    }

    @POST
    @Consumes("application/json")
    public Response addCompetence(String competence){

        JSONObject json = new JSONObject(competence);
        Competence c = new Competence(json.get("nom").toString(), json.get("description").toString());
        competenceBean.ajouterCompetence(c);
        return Response.ok(competence).build();
    }
}
