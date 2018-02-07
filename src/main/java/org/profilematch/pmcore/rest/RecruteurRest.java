package org.profilematch.pmcore.rest;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.RecruteurBean;
import org.profilematch.pmcore.entities.Recruteur;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("recruteur")
@Api(value = "Recruteur")
public class RecruteurRest {

    @EJB
    private RecruteurBean recruteurBean;

    @GET
    @Produces("application/json")
    @ApiOperation(value="Retourne tous les recruteurs")
    public Response getAll(){
        return Response.ok(recruteurBean.getRecruteurs()).build();
    }

    @GET
    @Path("/{id}")
    @Produces("application/json")
    @ApiOperation(value="Retourne le recruteur avec l'id renseigné")
    public Response getById(@PathParam("id") String id){
        return Response.ok(recruteurBean.getRecruteur((long) Integer.parseInt(id))).build();
    }

    @GET
    @Path("/findByEmail/{email}")
    @Produces("application/json")
    @ApiOperation(value="Retourne le recruteur avec l'email renseigné")
    public Response getByEmail(@PathParam("email") String email){
        return Response.ok(recruteurBean.getRecruteurByEmail(email)).build();
    }


    @PUT
    @Consumes("application/json")
    @ApiOperation(value="Modifie un recruteur")
    public Response update(Recruteur recruteur){
        return Response.ok(recruteurBean.modifierRecruteur(recruteur)).build();
    }

    @DELETE
    @Path("/{id}")
    @Consumes("application/json")
    @ApiOperation(value="Supprime un recruteur")
    public Response delete(@PathParam("id") String id) {
        recruteurBean.supprimerRecruteur((long) Integer.parseInt(id));
        return Response.ok().build();
    }


}
