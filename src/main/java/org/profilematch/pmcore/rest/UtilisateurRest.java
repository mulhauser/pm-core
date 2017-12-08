package org.profilematch.pmcore.rest;

/**
 * @author remy
 */
import org.profilematch.pmcore.ejbs.UtilisateursBean;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Remy
 */
@Path("utilisateur")
public class UtilisateurRest {

    @EJB
    private UtilisateursBean ue;

    @GET
    @Produces("text/plain")
    public Response doGet() {
        return Response.ok("hello world").build();
    }

    @GET
    @Path("get/{email}")
    @Produces("application/json")
    public Response GetUtilisateur(@PathParam("email") String email) {
        return Response.ok(ue.getUtilisateur(email)).build();
    }


}

