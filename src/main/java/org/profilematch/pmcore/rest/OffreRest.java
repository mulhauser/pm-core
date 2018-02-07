package org.profilematch.pmcore.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.OffreBean;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * @author remy
 */
@Path("offres")
@Api(value= "Offres")
@Consumes("application/json")
@Produces("application/json")
public class OffreRest {

    @EJB
    private OffreBean offreBean;

    @GET
    @ApiOperation(value="Retourne toutes les offres", notes="Retourne une réponse au client")
    public Response getAll(){
        return Response.ok(offreBean.getOffres()).build();
    }





}
