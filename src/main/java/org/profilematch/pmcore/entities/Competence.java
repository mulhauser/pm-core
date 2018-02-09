package org.profilematch.pmcore.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;

@Entity
@NamedQueries({
        @NamedQuery(name = "Competence.findAll", query = "SELECT u FROM Competence u")
})
public class Competence implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany
    @JoinTable(name="OFFRES_COMPETENCES",
            joinColumns = @JoinColumn(name="id_competence"),
            inverseJoinColumns = @JoinColumn(name = "id_offre"))
    private Collection<Offre> offres = new LinkedHashSet<Offre>();

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name="CANDIDATS_COMPETENCES",
            joinColumns = @JoinColumn(name="id_competence"),
            inverseJoinColumns = @JoinColumn(name = "id_candidat"))
    private Collection<Candidat> candidats = new LinkedHashSet<Candidat>();


    public Competence() {
    }

    public Competence(String nom, String description) {
        this.nom = nom;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id){
        this.id = id;
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

    @JsonIgnore
    public Collection<Candidat> getCandidats() {
        return candidats;
    }

    public void setCandidats(Collection<Candidat> candidats) {
        this.candidats = candidats;
    }

    @JsonIgnore
    public Collection<Offre> getOffres() {
        return offres;
    }

    public void setOffres(Collection<Offre> offres) {
        this.offres = offres;
    }

}
