package org.profilematch.pmcore.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.OffreBean;
import org.profilematch.pmcore.entities.Candidat;
import org.profilematch.pmcore.entities.Competence;
import org.profilematch.pmcore.entities.Offre;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.LinkedHashSet;

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

    @GET
    @ApiOperation(value="Retourne l'offre spécifiée")
    @Path("/{id}")
    public Response getOne(@PathParam("id") String id){
        return Response.ok(offreBean.getOffre((long) Integer.parseInt(id))).build();
    }

    @GET
    @ApiOperation(value="Retourne les utilisateurs dont les compétences correspondent à l'offre renseignée")
    @Path("/{id}/utilisateurs")
    public Response getCandidatByCompetenceWithOffre(@PathParam("id") String id){
        Offre o = offreBean.getOffre((long) Integer.parseInt(id));
        Collection<Candidat> list = new LinkedHashSet<Candidat>(); // Faire une hashmap et ensuite trier pour voir le candidat qui correspond le plus
        for(Competence c : o.getCompetences()){
            list.addAll(c.getCandidats());
        }
        return Response.ok(list).build();
    }



}
