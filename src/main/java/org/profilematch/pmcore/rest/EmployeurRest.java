package org.profilematch.pmcore.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.EmployeurBean;
import org.profilematch.pmcore.entities.Employeur;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("employeur")
@Api(value = "Employeur")
public class EmployeurRest {

    @EJB
    private EmployeurBean employeurBean;


    @GET
    @Produces("application/json")
    @ApiOperation(value="Retourne tous les employeurs")
    public Response getAll(){
        return Response.ok(employeurBean.getListEmployeur()).build();
    }

    @GET
    @ApiOperation(value = "Retourne l'employeur demandé", notes="Retourne une réponse au client")
    @Produces("application/json")
    @Path("{id}")
    public Response getOne(@PathParam("id") Long id){
        return Response.ok(employeurBean.getEmployeur(id)).build();
    }

    @POST
    @ApiOperation(value="Permet d'ajouter un employeur", notes="Retourne une réponse au client")
    @Consumes("application/json")
    public Response addExperience(Employeur experience){
        employeurBean.ajouterEmployeur(experience);
        return Response.ok(experience).build();
    }

    @DELETE
    @Path("{id}")
    public Response deleteExperience(@PathParam("id") Long id){
        employeurBean.deliteEmployeur(id);
        return Response.ok().build();
    }

    @PUT
    @ApiOperation(value="Modifie l'employeur demandé", notes="Retourne une réponse au client")
    @Consumes("application/json")
    public Response modifierCompetence(Employeur employeur){
        employeurBean.updateEmployeur(employeur);
        return Response.ok(employeur).build();
    }

}
