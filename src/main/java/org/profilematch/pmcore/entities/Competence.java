package org.profilematch.pmcore.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity
public class Competence implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;

    @ManyToMany
    @JoinTable(name="OFFRES_COMPETENCES",
            joinColumns = @JoinColumn(name="id_competence"),
            inverseJoinColumns = @JoinColumn(name = "id_offre"))
    private Collection<Offre> offres;

    @ManyToMany
    @JoinTable(name="CANDIDATS_COMPETENCES",
            joinColumns = @JoinColumn(name="id_competence"),
            inverseJoinColumns = @JoinColumn(name = "id_candidat"))
    private Collection<Candidat> candidats;


    public Competence() {
    }

    public Competence(String nom, String description) {
        this.nom = nom;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Collection<Candidat> getCandidats() {
        return candidats;
    }

    public void setCandidats(Collection<Candidat> candidats) {
        this.candidats = candidats;
    }

    public Collection<Offre> getOffres() {
        return offres;
    }

    public void setOffres(Collection<Offre> offres) {
        this.offres = offres;
    }

}
