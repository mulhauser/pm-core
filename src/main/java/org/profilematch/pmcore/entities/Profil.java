package org.profilematch.pmcore.entities;


import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "profil")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE_PROFIL", discriminatorType = DiscriminatorType.STRING, length = 1)
@NamedQueries({
        @NamedQuery(name = "Profil.findAllC", query = "SELECT u FROM Profil u WHERE u.class = 'C' AND u.suspendu = false "),
        @NamedQuery(name = "Profil.findAllR", query = "SELECT u FROM Profil u WHERE u.class = 'R' "),
        @NamedQuery(name = Profil.COUNT_C, query = "SELECT COUNT(u) FROM Profil u WHERE u.class = 'C' "),
        @NamedQuery(name = Profil.COUNT_R, query = "SELECT COUNT(u) FROM Profil u WHERE u.class = 'R' "),
        @NamedQuery(name = "Profil.findByEmail", query = "SELECT u FROM Profil u WHERE u.email = :email"),
        @NamedQuery(name = Profil.UPDATE_PHOTO, query = "UPDATE Profil u SET u.urlPhoto = :urlPhoto WHERE u.email = :email")
})
public abstract class Profil implements Serializable {

    public static final String UPDATE_PHOTO = "Profil.updatePhoto";
    public static final String COUNT_C = "Profil.count_c";
    public static final String COUNT_R = "Profil.count_r";



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String pays;
    private String ville;
    @Column(name = "code_postal")
    private String codePostal;
    private String email;
    private String telephone;
    @Column(name = "date_naissance")
    private Calendar dateNaissance;
    private String titre;
    @Size(max = 1024)
    private String apropos;
    private String status;
    private String urlPhoto;
    private Boolean suspendu = false;
    @ManyToOne
    @JoinColumn(name="id_employeur")
    private Employeur employeur;

    /*
    @OneToMany(mappedBy = "profil", fetch = FetchType.LAZY)
    private Collection<Cursus> cursus;

    @OneToMany(mappedBy = "profil", fetch = FetchType.LAZY)
    private Collection<Notification> notifications;


    public Collection<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(Collection<Notification> notifications) {
        this.notifications = notifications;
    }

    public Collection<Cursus> getCursus() {
        return cursus;
    }

    public void setCursus(Collection<Cursus> cursus) {
        this.cursus = cursus;
    }



*/

    public Profil() {
    }

    public Profil(String lastName, String firstName, String email) {
        this.nom = lastName;
        this.prenom = firstName;
        this.email = email;
    }

    @ApiModelProperty(hidden = true)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Calendar getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Calendar dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getApropos() {
        return apropos;
    }

    public Boolean getSuspendu() {
        return suspendu;
    }

    public void setSuspendre(){
        if(this.suspendu == false)
            this.suspendu = true;
        else this.suspendu = false;
    }

    public void setApropos(String apropos) {
        this.apropos = apropos;
    }

    public Profil(String nom, String prenom, String pays, String ville, String codePostal, String email, String telephone, Calendar dateNaissance, String titre, String apropos, String status) {
        this.nom = nom;
        this.prenom = prenom;
        this.pays = pays;
        this.ville = ville;
        this.codePostal = codePostal;
        this.email = email;
        this.telephone = telephone;
        this.dateNaissance = dateNaissance;
        this.titre = titre;
        this.apropos = apropos;
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public String getUrlPhoto() {
        return urlPhoto;
    }

    public void setUrlPhoto(String urlPhoto) {
        this.urlPhoto = urlPhoto;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Employeur getEmployeur() { return employeur; }

    public void setEmployeur(Employeur employeur) { this.employeur = employeur;  }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Profil)) {
            return false;
        }
        Profil other = (Profil) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.imp.entities.Candidat[ id=" + id + " ]";
    }
}
