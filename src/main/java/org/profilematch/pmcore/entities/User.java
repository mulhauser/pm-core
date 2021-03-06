package org.profilematch.pmcore.entities;

import org.profilematch.pmcore.utils.PasswordUtils;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Objects;
import java.util.UUID;

/**
 * @author Antonio Goncalves
 *         http://www.antoniogoncalves.org
 *         --
 */
@Entity
@Table(name = "t_user")
@NamedQueries({
        @NamedQuery(name = User.FIND_ALL, query = "SELECT u FROM User u ORDER BY u.lastName DESC"),
        @NamedQuery(name = User.FIND_BY_EMAIL_PASSWORD, query = "SELECT u FROM User u WHERE u.email = :email AND u.password = :password"),
        @NamedQuery(name = User.FIND_BY_EMAIL, query = "SELECT u FROM User u WHERE u.email = :email"),
        @NamedQuery(name = User.COUNT_ALL, query = "SELECT COUNT(u) FROM User u"),
        @NamedQuery(name = User.UPDATE_PHOTO, query = "UPDATE User u SET u.urlPhoto = :urlPhoto WHERE u.email = :email")
})
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class User {

    // ======================================
    // =             Constants              =
    // ======================================

    public static final String FIND_ALL = "User.findAll";
    public static final String COUNT_ALL = "User.countAll";
    public static final String FIND_BY_EMAIL_PASSWORD = "User.findByEmailAndPassword";
    public static final String FIND_BY_EMAIL = "User.findByEmail";
    public static final String UPDATE_PHOTO = "User.updatePhoto";

    // ======================================
    // =             Attributes             =
    // ======================================

    @Id
    private String email;
    private String lastName;
    private String firstName;
    @Column(length = 256, nullable = false)
    private String password;
    private String urlPhoto;
    private String token;
    private String type;

    // ======================================

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    // =            Constructors            =
    // ======================================

    public User() {
    }

    public User( String lastName) {
        this.lastName = lastName;
    }

    public User(String lastName, String firstName, String password) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.password = password;
    }


    public User(String lastName, String firstName,  String email, String password, String token, String type) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.token = token;
        this.type = type;
    }

    // ======================================
    // =         Lifecycle methods          =
    // ======================================

    @PrePersist
    private void setUUID() {
        password = PasswordUtils.digestPassword(password);
    }

    // ======================================
    // =          Getters & Setters         =
    // ======================================
    public String getUrlPhoto() {
        return urlPhoto;
    }

    public void setUrlPhoto(String urlPhoto) {
        this.urlPhoto = urlPhoto;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    // ======================================
    // =   Methods hash, equals, toString   =
    // ======================================

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(email, user.email);
    }


    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                '}';
    }
}