package org.profilematch.pmcore.entities;

/**
 * @author titem
 */

public class CandidatPondere {

    private Candidat candidat;
    private float poucentage;

    public CandidatPondere(Candidat candidat, float poucentage) {
        this.candidat = candidat;
        this.poucentage = poucentage;
    }

    public Candidat getCandidat() {
        return candidat;
    }

    public void setCandidat(Candidat candidat) {
        this.candidat = candidat;
    }

    public float getPourcentage() {
        return poucentage;
    }

    public void setPourcentage(float poucentage) {
        this.poucentage = poucentage;
    }
}
