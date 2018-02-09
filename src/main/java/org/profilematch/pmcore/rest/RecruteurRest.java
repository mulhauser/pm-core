package org.profilematch.pmcore.rest;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.profilematch.pmcore.ejbs.OffreBean;
import org.profilematch.pmcore.ejbs.RecruteurBean;
import org.profilematch.pmcore.entities.Competence;
import org.profilematch.pmcore.entities.Offre;
import org.profilematch.pmcore.entities.Recruteur;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("recruteur")
@Api(value = "Recruteur")
@Produces("application/json")
@Consumes("application/json")
public class RecruteurRest {

    @EJB
    private RecruteurBean recruteurBean;

    @EJB
    private OffreBean offreBean;

    @GET
    @ApiOperation(value="Retourne tous les recruteurs")
    public Response getAll(){
        return Response.ok(recruteurBean.getRecruteurs()).build();
    }

    @GET
    @Path("/{id}")
    @ApiOperation(value="Retourne le recruteur avec l'id renseigné")
    public Response getById(@PathParam("id") String id){
        return Response.ok(recruteurBean.getRecruteur((long) Integer.parseInt(id))).build();
    }

    @GET
    @Path("/findByEmail/{email}")
    @ApiOperation(value="Retourne le recruteur avec l'email renseigné")
    public Response getByEmail(@PathParam("email") String email){
        return Response.ok(recruteurBean.getRecruteurByEmail(email)).build();
    }


    @PUT
    @ApiOperation(value="Modifie un recruteur")
    public Response update(Recruteur recruteur){
        return Response.ok(recruteurBean.modifierRecruteur(recruteur)).build();
    }

    @DELETE
    @Path("/{id}")
    @ApiOperation(value="Supprime un recruteur")
    public Response delete(@PathParam("id") String id) {
        recruteurBean.supprimerRecruteur((long) Integer.parseInt(id));
        return Response.ok().build();
    }

    @GET
    @Path("/{id}/offres")
    @ApiOperation(value="Retourne les offres que le recruteur a créé")
    public Response getOffres(@PathParam("id") String id){
        return Response.ok(recruteurBean.getRecruteur((long) Integer.parseInt(id)).getOffres()).build();
    }

    @POST
    @Path("/{id}/offres")
    @ApiOperation(value="Permet au recruteur de créer une offre")
    public Response addOffre(@PathParam("id") String id, Offre offre){
        offre.setRecruteur(recruteurBean.getRecruteur((long) Integer.parseInt(id)));
        offreBean.creerOffre(offre);
        return Response.ok(offre).build();
    }

    @PUT
    @Path("/{id}/offres")
    @ApiOperation(value = "Permet au recruteur de modifier une offre")
    public Response modifierOffre(@PathParam("id") String id, Offre offre){
        Recruteur recruteur = recruteurBean.getRecruteur((long) Integer.parseInt(id));
        if(offre.getRecruteur().equals(recruteur)){
            offreBean.modifierOffre(offre);
        }
        return Response.ok(offre).build();
    }
}
