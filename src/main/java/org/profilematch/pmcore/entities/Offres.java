package org.profilematch.pmcore.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

/**
 * @author remy
 */
@Entity
@Table(name = "offres")
public class Offres implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "intitule")
    private String intitule;

    @Basic(optional = false)
    @NotNull
    @Column(name = "niveau_requis")
    private String niveauRequis;

    @Column(name = "date_emission")
    private Date dateEmission;

    @Size(max = 30)
    @Column(name = "type_contrat")
    private String typeContrat;

    @Column(name = "salaire_min")
    private int salaireMin;

    @Column(name = "salaire_max")
    private int salaireMax;

    @Size(min = 20)
    @Column(name = "description")
    private String description;

    @Column(name = "mission")
    private String mission;

    @Column(name = "date_limite")
    private Date dateLimite;


    public Offres(String intitule, String niveauRequis, String typeContrat, int salaireMin, int salaireMax, String description, String mission) {
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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Offres offres = (Offres) o;

        if (salaireMin != offres.salaireMin) return false;
        if (salaireMax != offres.salaireMax) return false;
        if (!intitule.equals(offres.intitule)) return false;
        if (!niveauRequis.equals(offres.niveauRequis)) return false;
        if (dateEmission != null ? !dateEmission.equals(offres.dateEmission) : offres.dateEmission != null)
            return false;
        if (!typeContrat.equals(offres.typeContrat)) return false;
        if (!description.equals(offres.description)) return false;
        if (!mission.equals(offres.mission)) return false;
        return dateLimite != null ? dateLimite.equals(offres.dateLimite) : offres.dateLimite == null;
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
