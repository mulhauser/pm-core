package org.profilematch.pmcore.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Collection;

@Entity

@DiscriminatorValue("C")
public class Candidat extends Profil{

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "candidat")
    private Collection<Experience> experiences;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(mappedBy = "candidats")
    private Collection<Competence> competences;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @LazyCollection(LazyCollectionOption.FALSE)
    @JoinTable(name="OFFRES_CANDIDATS",
            joinColumns = @JoinColumn(name="id_candidat"),
            inverseJoinColumns = @JoinColumn(name = "id_offre"))
    private Collection<Offre> offres;

    /*
        @OneToMany(mappedBy = "id.candidat")
        private Collection<DemandeAvis> demandeAvis;


        public Collection<DemandeAvis> getDemandeAvis() {
            return demandeAvis;
        }

        public void setDemandeAvis(Collection<DemandeAvis> demandeAvis) {
            this.demandeAvis = demandeAvis;
        }

    */
    public Candidat(String nom, String prenom, String pays, String ville, String codePostal, String email, String telephone, Calendar dateNaissance, String titre, String apropos,  String status) {
        super(nom, prenom, pays, ville, codePostal, email, telephone, dateNaissance, titre, apropos, status);
    }

    public Candidat() {
        super();
    }

    public Candidat(String lastName, String firstName, String email) {
        super(lastName, firstName, email);
    }

    public Collection<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(Collection<Experience> experiences) {
        this.experiences = experiences;
    }

    public Collection<Competence> getCompetences() {
        return competences;
    }

    public void setCompetences(Collection<Competence> competences) {
        this.competences = competences;
    }

    @ApiModelProperty(hidden = true)
    public Collection<Offre> getOffres() {
        return offres;
    }

    public void setOffres(Collection<Offre> offres) {
        this.offres = offres;
    }


}
