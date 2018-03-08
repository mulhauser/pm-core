package org.profilematch.pmcore.rest;

import io.swagger.annotations.Api;
import org.profilematch.pmcore.ejbs.Mail;
import org.profilematch.pmcore.jwt.JWTTokenNeeded;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("serviceMail")
@Api(value = "Mail")
public class MailRest {

    @EJB
    private Mail mail;

    @POST
    @JWTTokenNeeded
    @Path("envoyer")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response envoyerMail(String mails) {
        String res ;
        try {
            res = mail.envoyer(mails);
        } catch (Exception ex) {
            return Response.status(201).build();
        }
        return Response.ok(res).build();
    }
}
