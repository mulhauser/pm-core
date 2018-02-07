package org.profilematch.pmcore.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;

@Entity
@NamedQueries({
        @NamedQuery(name = "Experience.findAll", query = "SELECT u FROM Experience u")
})
public class Experience implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @Column(name = "type_contrat")
    private String typeContrat;


    @Column(name = "date_debut")
    private Date dateDebut;


    @Column(name = "date_fin")
    private Date dateFin;


    @Column(name = "description")
    private String description;

    @Column(name ="poste_occuper")
    private String posteOccuper;

    @ManyToOne
    @JoinColumn(name = "id_candidat")
    private Candidat candidat;



    @ManyToOne
    @JoinColumn(name = "id_employeur")
    private Employeur employeur;

     public Employeur getEmployeur() {
        return employeur;
    }

    public void setEmployeur(Employeur employeur) {
        this.employeur = employeur;
    }



    public Experience(String typeContrat, Date dateDebut, Date dateFin, String description, String posteOccuper){
        this.typeContrat = typeContrat;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.description = description;
        this.posteOccuper = posteOccuper;
    }

    public Experience() {
    }

    @ApiModelProperty(hidden = true)
    public Long getId() {
        return id;
    }

    public void setId(Long expericenId) {
        this.id = expericenId;
    }

    public String getTypeContrat() {
        return typeContrat;
    }

    public void setTypeContrat(String typeContrat) {
        this.typeContrat = typeContrat;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPosteOccuper() {
        return posteOccuper;
    }

    public void setPosteOccuper(String posteOccuper) {
        this.posteOccuper = posteOccuper;
    }

    @ApiModelProperty(hidden = true)
    @JsonIgnore
    public Candidat getCandidat() {
        return candidat;
    }

    public void setCandidat(Candidat candidat) {
        this.candidat = candidat;
    }



    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Experience)) {
            return false;
        }
        Experience other = (Experience) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.profilematch.pmcore.entities.Experience[ id=" + id + " ]";
    }
}
