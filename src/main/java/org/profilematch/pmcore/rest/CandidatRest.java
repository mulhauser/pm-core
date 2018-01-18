package org.profilematch.pmcore.rest;


import io.swagger.annotations.Api;
import org.profilematch.pmcore.ejbs.CandidatBean;
import org.profilematch.pmcore.entities.Candidat;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;


@Path("candidat")
@Api(value = "Candidat")
public class CandidatRest {

    @EJB
    private CandidatBean candidatBean;

    @GET
    @Produces("application/json")
    public Response getAll(){
        return Response.ok(candidatBean.getCandidats()).build();
    }

    @GET
    @Path("/{id}")
    @Produces("application/json")
    public Response getById(@PathParam("id") String id){
        return Response.ok(candidatBean.getCandidat((long) Integer.parseInt(id))).build();
    }

    @POST
    @Consumes("application/json")
    public Response create(Candidat candidat){
        candidatBean.ajouterCandidat(candidat);
        return Response.ok().build();
    }

    @PUT
    @Consumes("application/json")
    public Response update(Candidat candidat){
        return Response.ok(candidatBean.modifierCandidat(candidat)).build();
    }

    @DELETE
    @Path("/{id}")
    @Consumes("application/json")
    public Response delete(@PathParam("id") String id) {
        candidatBean.supprimerCandidat((long) Integer.parseInt(id));
        return Response.ok().build();
    }
}
