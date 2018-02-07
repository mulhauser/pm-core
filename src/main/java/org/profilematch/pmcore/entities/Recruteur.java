package org.profilematch.pmcore.entities;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Collection;
import java.util.LinkedHashSet;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@DiscriminatorValue("R")
public class Recruteur extends Profil {

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "recruteur")
    private Collection<Offre> offres;

   /* @OneToMany(mappedBy = "id.recruteur")
    //@Cascade({CascadeType.SAVE_UPDATE})
    private Collection<DemandeAvis> demandeAvis;

    public Collection<DemandeAvis> getDemandeAvis() {
        return demandeAvis;
    }

    public void setDemandeAvis(Collection<DemandeAvis> demandeAvis) {
        this.demandeAvis = demandeAvis;
    }*/


    public Recruteur() {
    }


    public Recruteur(String nom, String prenom, String pays, String ville, String codePostal, String email, String telephone, Calendar dateNaissance, String titre, String apropos,  String status) {
        super(nom, prenom, pays, ville, codePostal, email, telephone, dateNaissance, titre, apropos, status);
    }

    public Recruteur(String lastName, String firstName, String email) {
        super(lastName, firstName, email);
    }

    @ApiModelProperty(hidden = true)
    @JsonIgnore
    public Collection<Offre> getOffres() {
        return offres;
    }
    public void setOffres(Collection<Offre> offres) {
        this.offres = offres;
    }




}
