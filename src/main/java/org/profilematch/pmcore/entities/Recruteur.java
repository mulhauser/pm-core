package org.profilematch.pmcore.entities;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Calendar;
import java.util.Collection;

@Entity
@DiscriminatorValue("R")
public class Recruteur extends Profil {

    public Recruteur(){
        super();
    }

    public Recruteur(String nom, String prenom, String pays, String ville, String codePostal, String email, String telephone, Calendar dateNaissance, String titre, String apropos, String status) {
        super(nom, prenom, pays, ville, codePostal, email, telephone, dateNaissance, titre, apropos, status);
    }

    public Recruteur(String lastName, String firstName, String email) {

        super(lastName, firstName, email);
    }

}
