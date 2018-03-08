package org.profilematch.pmcore.config;


import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 */
@javax.ws.rs.ApplicationPath("rest")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(CorsFeature.class);
        resources.add(org.profilematch.pmcore.jwt.JWTTokenNeededFilter.class);
        resources.add(org.profilematch.pmcore.rest.CompetenceRest.class);
        resources.add(org.profilematch.pmcore.rest.ExperienceRest.class);
        resources.add(org.profilematch.pmcore.rest.RecruteurRest.class);
        resources.add(org.profilematch.pmcore.rest.UserEndpoint.class);
        resources.add(org.profilematch.pmcore.rest.EchoEndpoint.class);
        resources.add(org.profilematch.pmcore.rest.CandidatRest.class);
        resources.add(org.profilematch.pmcore.rest.EmployeurRest.class);
        resources.add(org.profilematch.pmcore.rest.MailRest.class);
        resources.add(org.profilematch.pmcore.rest.OffreRest.class);
        resources.add(org.profilematch.pmcore.rest.MatcherOffreRest.class);
        resources.add(com.github.phillipkruger.apiee.ApieeService.class);

    }
    
}
