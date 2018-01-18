package org.profilematch.pmcore.rest;


import io.swagger.annotations.Api;
import org.profilematch.pmcore.entities.Candidat;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;


@Path("candidat")
@Api(value = "Candidat")
public class CandidatRest {

    @GET
    @Produces("application/json")
    public Response getAll(){
        return null;
    }

    @GET
    @Path("/{id}")
    @Produces("application/json")
    public Response getById(@PathParam("id") String id){
        return null;
    }

    @POST
    @Consumes("application/json")
    public Response create(Candidat candidat){
        return null;
    }

    @PUT
    @Consumes("application/json")
    public Response update(Candidat candidat){
        return null;
    }

    @DELETE
    @Path("/{id}")
    @Consumes("application/json")
    public Response delete(@PathParam("id") String id){
        return null;
    }


}
