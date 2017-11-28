package org.profilematch.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * EXEMPLE Entity
 * @author Flavien
 */
@Entity
@Table(name = "users")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "Users.findAll", query = "SELECT u FROM Users u"),
        @NamedQuery(name = "Users.findByEmail", query = "SELECT u FROM Users u WHERE u.email = :email"),
        @NamedQuery(name = "Users.findById", query = "SELECT u FROM Users u WHERE u.id = :id"),
        @NamedQuery(name = "Users.findByMotdepasse", query = "SELECT u FROM Users u WHERE u.motdepasse = :motdepasse"),
        @NamedQuery(name = "Users.findByType", query = "SELECT u FROM Users u WHERE u.type = :type")})
public class Users implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Long id;
    @Size(min = 0, max = 45)
    @Column(name = "motdepasse")
    private String motdepasse;
    @Size(max = 45)
    @Column(name = "type")
    private String type;
    @Column(name = "tokenacces")
    private String tokenacces;

    public String getTokenacces() {
        return tokenacces;
    }

    public void setTokenacces(String tokenacces) {
        this.tokenacces = tokenacces;
    }

    private int safe;

    public Users() {
    }

    public Users(String email) {
        this.email = email;
        this.safe = 1000;
    }

    public Users(String email, String tokenacces) {
        this.email = email;
        this.tokenacces = tokenacces;
        this.safe = 1000;
    }

    public Users(Long id, String email, String motdepasse, String type) {
        this.email = email;
        this.id = id;
        this.motdepasse = motdepasse;
        this.type = type;
        this.safe = 1000;
    }

    public Users(Users u) {
        this.email = u.getEmail();
        this.id = u.getId();
        this.motdepasse = u.getMotdepasse();
        this.type = u.getType();
        this.safe = u.getSafe();
        this.tokenacces = u.getTokenacces();
    }

    public int getSafe() {
        return safe;
    }

    public void setSafe(int safe) {
        this.safe = safe;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMotdepasse() {
        return motdepasse;
    }

    public void setMotdepasse(String motdepasse) {
        this.motdepasse = motdepasse;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (email != null ? email.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Users)) {
            return false;
        }
        Users other = (Users) object;
        if ((this.email == null && other.email != null) || (this.email != null && !this.email.equals(other.email))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.profilematch.pmcore.entities.Users[ email=" + email + " ]";
    }

}


