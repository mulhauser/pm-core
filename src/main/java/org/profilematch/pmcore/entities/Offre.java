package org.profilematch.pmcore.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

/**
 * @author remy
 */
@Entity
public class Offre implements Serializable{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String intitule;
    private String niveauRequis;

    @Column(name = "date_emission")
    private Date dateEmission;

    @Column(name = "type_contrat")
    private String typeContrat;

    @Column(name = "salaire_min")
    private int salaireMin;

    @Column(name = "salaire_max")
    private int salaireMax;

    private String description;

    private String mission;

    @Column(name = "date_limite")
    private Date dateLimite;

    @ManyToMany(mappedBy = "offres")
    private Collection<Candidat> candidats;

    @ManyToMany(mappedBy = "offres")
    private Collection<Competence> competences;

    /*@ManyToOne
    @JoinColumn(name="id_employeur")
    private Employeur employeur;

    @ManyToOne
    @JoinColumn(name="id_recruteur")
    private Recruteur recruteur;

    @OneToMany(mappedBy = "offre", fetch = FetchType.LAZY)
    private Collection<Commentaire> commentaires;

    public Employeur getEmployeur() {
        return employeur;
    }

    public void setEmployeur(Employeur employeur) {
        this.employeur = employeur;
    }

    public Recruteur getRecruteur() {
        return recruteur;
    }

    public void setRecruteur(Recruteur recruteur) {
        this.recruteur = recruteur;
    }

    public Collection<Commentaire> getCommentaires() {
        return commentaires;
    }

    public void setCommentaires(Collection<Commentaire> commentaires) {
        this.commentaires = commentaires;
    }

    */

    public Offre() {
    }

    public Offre(String intitule, String niveauRequis, String typeContrat, int salaireMin, int salaireMax, String description, String mission) {
        this.intitule = intitule;
        this.niveauRequis = niveauRequis;
        this.typeContrat = typeContrat;
        this.salaireMin = salaireMin;
        this.salaireMax = salaireMax;
        this.description = description;
        this.mission = mission;
    }

    public String getNiveauRequis() {
        return niveauRequis;
    }

    public void setNiveauRequis(String niveauRequis) {
        this.niveauRequis = niveauRequis;
    }

    public Date getDateEmission() {
        return dateEmission;
    }

    public void setDateEmission(Date dateEmission) {
        this.dateEmission = dateEmission;
    }

    public String getTypeContrat() {
        return typeContrat;
    }

    public void setTypeContrat(String typeContrat) {
        this.typeContrat = typeContrat;
    }

    public int getSalaireMin() {
        return salaireMin;
    }

    public void setSalaireMin(int salaireMin) {
        this.salaireMin = salaireMin;
    }

    public int getSalaireMax() {
        return salaireMax;
    }

    public void setSalaireMax(int salaireMax) {
        this.salaireMax = salaireMax;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMission() {
        return mission;
    }

    public void setMission(String mission) {
        this.mission = mission;
    }

    public Date getDateLimite() {
        return dateLimite;
    }

    public void setDateLimite(Date dateLimite) {
        this.dateLimite = dateLimite;
    }


    public Long getId() {
        return id;
    }

    public String getIntitule() {
        return intitule;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }



    public Collection<Candidat> getCandidats() {
        return candidats;
    }

    public void setCandidats(Collection<Candidat> candidats) {
        this.candidats = candidats;
    }

    public Collection<Competence> getCompetences() {
        return competences;
    }

    public void setCompetences(Collection<Competence> competences) {
        this.competences = competences;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Offre offre = (Offre) o;

        if (salaireMin != offre.salaireMin) return false;
        if (salaireMax != offre.salaireMax) return false;
        if (!intitule.equals(offre.intitule)) return false;
        if (!niveauRequis.equals(offre.niveauRequis)) return false;
        if (dateEmission != null ? !dateEmission.equals(offre.dateEmission) : offre.dateEmission != null)
            return false;
        if (!typeContrat.equals(offre.typeContrat)) return false;
        if (!description.equals(offre.description)) return false;
        if (!mission.equals(offre.mission)) return false;
        return dateLimite != null ? dateLimite.equals(offre.dateLimite) : offre.dateLimite == null;
    }

    @Override
    public int hashCode() {
        int result = intitule.hashCode();
        result = 31 * result + niveauRequis.hashCode();
        result = 31 * result + (dateEmission != null ? dateEmission.hashCode() : 0);
        result = 31 * result + typeContrat.hashCode();
        result = 31 * result + salaireMin;
        result = 31 * result + salaireMax;
        result = 31 * result + description.hashCode();
        result = 31 * result + mission.hashCode();
        result = 31 * result + (dateLimite != null ? dateLimite.hashCode() : 0);
        return result;
    }
}