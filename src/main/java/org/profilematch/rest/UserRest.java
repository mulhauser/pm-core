package org.profilematch.rest;

/**
 * @author remy
 */
import javax.ws.rs.core.Response;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * REST Web Service
 *
 * @author Remy
 */
@Path("utilisateur")
public class UserRest {

    @GET
    @Produces("text/plain")
    public Response doGet() {
        return Response.ok("Hello from wildfly swarm!").build();
    }

}

