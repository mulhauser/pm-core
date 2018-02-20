package org.profilematch.pmcore.entities;

import java.util.Comparator;

/**
 * @author titem
 */

public class CandidatPondere implements Comparable<CandidatPondere>{

    private Candidat candidat;
    private Float poucentage;

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

    @Override
    public int compareTo(CandidatPondere o) {
        return Comparators.POURCENTAGE.compare(o, this);
    }

    public static class Comparators {

        public static Comparator<CandidatPondere> POURCENTAGE = new Comparator<CandidatPondere>() {
            @Override
            public int compare(CandidatPondere o1, CandidatPondere o2) {
                return o1.poucentage.compareTo(o2.getPourcentage());
            }
        };

    }
}
