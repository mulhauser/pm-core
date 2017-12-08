package org.profilematch.pmcore.entities;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "experience")
@XmlRootElement
public class Experience implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Basic(optional = false)
    @NotNull
    @Column(name = "type_contrat")
    private String typeContrat;

    @Basic(optional = false)
    @NotNull
    @Column(name = "date_debut")
    private Date dateDebut;

    @Basic(optional = false)
    @NotNull
    @Column(name = "date_fin")
    private Date dateFin;

    @Basic(optional = false)
    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name ="poste_occuper")
    private String posteOccuper;


    public Experience(String typeContrat, Date dateDebut, Date dateFin, String description, String posteOccuper){
        this.typeContrat = typeContrat;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.description = description;
        this.posteOccuper = posteOccuper;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

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
