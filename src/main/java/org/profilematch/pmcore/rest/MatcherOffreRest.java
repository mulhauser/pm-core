package org.profilematch.pmcore.rest;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.MatcherBean;
import org.profilematch.pmcore.entities.Candidat;
import org.profilematch.pmcore.entities.CandidatPondere;
import org.profilematch.pmcore.entities.Competence;
import org.profilematch.pmcore.entities.Offre;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;

/**
 * @author titem
 */

@Path("matcherOffre")
@Api(value= "matcherOffre")
@Consumes("application/json")
@Produces("application/json")
public class MatcherOffreRest {

    @EJB
    MatcherBean matcherBean;

    @GET
    @ApiOperation(value="Retourne la liste des candidats avec pondération de leur correspondance à l'offre", notes="Retourne une réponse au client")
    @Path("/{id}/{avecExperience}")
    public Response getCandidatByOffre(@PathParam("id") String id,@PathParam("avecExperience") Boolean exp){
        List<CandidatPondere> list = matcherBean.matcherCandidatExperimentes((long) Integer.parseInt(id), exp);
        return Response.ok(list).build();
    }


}
