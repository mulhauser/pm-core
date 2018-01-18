package org.profilematch.pmcore.entities;


import javax.persistence.*;
import java.util.Calendar;
import java.util.Collection;

@Entity
@NamedQueries({
        @NamedQuery(name = "Candidat.findAll", query = "SELECT u FROM Candidat u")
})
@DiscriminatorValue("C")
public class Candidat extends Profil{

    @OneToMany(mappedBy = "candidat")
    private Collection<Experience> experiences;


    @ManyToMany(mappedBy = "candidats")
    private Collection<Competence> competences;


    @ManyToMany
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

    public Collection<Offre> getOffres() {
        return offres;
    }

    public void setOffres(Collection<Offre> offres) {
        this.offres = offres;
    }


}
