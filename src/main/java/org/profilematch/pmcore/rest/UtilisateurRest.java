package org.profilematch.pmcore.rest;

/**
 * @author remy
 */
import io.swagger.annotations.Api;
import org.profilematch.pmcore.ejbs.UtilisateursBean;
import org.profilematch.pmcore.entities.Utilisateur;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Remy
 */
@Path("utilisateur/")
@Api(value = "Utilisateur service")
public class UtilisateurRest {

    @EJB
    private UtilisateursBean ue;

    @GET
    @Path("get/{email}")
    @Produces("application/json")
    public Response GetUtilisateur(@PathParam("email") String email) {
        return Response.ok(ue.getUtilisateur(email)).build();
    }

    @POST
    @Consumes("application/json")
    @Path("inscrire")
    public Response InscrireUtilisateur(Utilisateur u) {

        ue.inscrireUtilisateur(u);
        return Response.ok().build();
    }


    @PUT
    @Consumes("application/json")
    @Path("modifier/")
    public Response ModifierUtilisateur(Utilisateur u) {
        ue.modifierUtilisateur(u);
        return Response.ok().build();
    }

    @GET
    @Path("get")
    @Produces("application/json")
    public Response GetUtilisateurs() {
        return Response.ok(ue.getUtilisateurs()).build();
    }

    @PUT
    @Path("getUtilisateur")
    @Produces("application/json")
    public Response GetUtilisateur(Utilisateur u) {
        return Response.ok(ue.getUtilisateurByEmail(u.getEmail())).build();
    }

    @GET
    @Path("connexion/{email}/{hache}")
    @Produces("application/json")
    public Response connexion(@PathParam("email") String email, @PathParam("hache") String hache) {
        return Response.ok(ue.connexion(email, hache)).build();
    }

}
