package org.profilematch.pmcore.entities;


import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.util.Collection;
import java.io.Serializable;

@Entity
@NamedQueries({
        @NamedQuery(name = "Employeur.findAll", query = "SELECT u FROM Employeur u")
})
public class Employeur implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomEts;
    private String pays;
    private String ville;
    private String rue;
    private int codePostal;
    private Long telephone;
    private String email;


    @OneToMany(mappedBy = "employeur", fetch = FetchType.LAZY)
    private Collection<Profil> profils;


    public Employeur() {
    }

    public Employeur(String nomEts, String pays, String ville, String rue, int codePostal, Long telephone, String email) {
        this.nomEts = nomEts;
        this.pays = pays;
        this.ville = ville;
        this.rue = rue;
        this.codePostal = codePostal;
        this.telephone = telephone;
        this.email = email;
    }

    @ApiModelProperty(hidden = true)
    public Long getId() {  return id;   }

    public String getNomEts() {return nomEts;  }

    public void setNomEts(String nomEts) { this.nomEts = nomEts;  }

    public String getPays() { return pays;  }

    public void setPays(String pays) { this.pays = pays;  }

    public String getVille() {  return ville; }

    public void setVille(String ville) {  this.ville = ville;  }

    public String getRue() { return rue;}

    public void setRue(String rue) { this.rue = rue; }

    public int getCodePostal() { return codePostal; }

    public void setCodePostal(int codePostal) { this.codePostal = codePostal; }

    public Long getTelephone() { return telephone;}

    public void setTelephone(Long telephone) { this.telephone = telephone;  }

    public String getEmail() { return email; }

    public void setEmail(String email) {   this.email = email;  }

    public Collection<Profil> getProfils() { return profils; }

    public void setProfils(Collection<Profil> profils) { this.profils = profils; }


}
