package org.profilematch.pmcore.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Collection;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@DiscriminatorValue("R")
public class Recruteur extends Profil {

    @OneToMany(mappedBy = "recruteur", fetch = FetchType.LAZY)
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

    public Collection<Offre> getOffres() {
        return offres;
    }
    public void setOffres(Collection<Offre> offres) {
        this.offres = offres;
    }




}
