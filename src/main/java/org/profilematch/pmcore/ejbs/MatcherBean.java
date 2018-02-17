package org.profilematch.pmcore.ejbs;


import org.profilematch.pmcore.entities.*;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import java.util.*;

/**
 * @author titem
 */

@Stateless
@LocalBean
public class MatcherBean {

    @EJB
    OffreBean offreBean;

    @EJB
    CompetenceBean competenceBean;

    @EJB
    ExperienceBean experienceBean;


    List<CandidatPondere> listCandidats;
    HashMap<Long, Boolean> listCtrl;
    int nbrCometences;
    int pourcentageExp;

    public List<CandidatPondere> matcherCandidatExperimentes(Long idOffre, boolean avecExperience){
        System.out.println(avecExperience);
        if(avecExperience){
            pourcentageExp = 70;
        }else{
            pourcentageExp = 30;
        }

        this.listCandidats = new ArrayList<CandidatPondere>();
        this.listCtrl = new HashMap<Long, Boolean>();
        CandidatPondere candidat=null;
        int duree=0;

        Offre o = offreBean.getOffre(idOffre);
        this.nbrCometences = o.getCompetences().size();

        for (Competence c : o.getCompetences()){
            List<Experience> listExp = experienceBean.getExperiencesByCle(c.getNom());
            int cpt =0;

            if(!listExp.isEmpty()) {
                System.out.println("experience "+listExp.get(cpt).getDescription());
                duree = nombreMois(listExp.get(cpt).getDateDebut(), listExp.get(cpt).getDateFin());
                candidat = new CandidatPondere(listExp.get(cpt).getCandidat(), 0);
                cpt++;

                while (cpt < listExp.size()){
                    System.out.println("experience "+listExp.get(cpt).getDescription());
                    if(listExp.get(cpt).getCandidat().getId() != candidat.getCandidat().getId()){
                        pondererCandidatExp(candidat, duree);
                        candidat = new CandidatPondere(listExp.get(cpt).getCandidat(), 0);
                        duree = nombreMois(listExp.get(cpt).getDateDebut(), listExp.get(cpt).getDateFin());
                    }else {
                        duree = duree+nombreMois(listExp.get(cpt).getDateDebut(), listExp.get(cpt).getDateFin());
                    }
                    if(cpt == listExp.size()-1){
                        pondererCandidatExp(candidat, duree);
                    }
                    cpt++;
                }
            }

            for(Candidat cand : c.getCandidats()){
                if(this.listCtrl.containsKey(cand.getId())){
                    for(CandidatPondere cp : this.listCandidats){
                        if(cp.getCandidat().getId() == cand.getId()){
                            cp.setPourcentage(cp.getPourcentage()+(100-pourcentageExp)/nbrCometences);
                            break;
                        }
                    }
                }else{
                    CandidatPondere cp = new CandidatPondere(cand,(100-pourcentageExp)/nbrCometences);
                    this.listCandidats.add(cp);
                    this.listCtrl.put(cand.getId(), true);
                }
            }
        }//fin list offre.competence

        return listCandidats;
    }

    private void pondererCandidatExp(CandidatPondere candidat, int duree){

        if(duree > 5*12){
            candidat.setPourcentage(candidat.getPourcentage()+ (this.pourcentageExp/this.nbrCometences));

        }else if(duree > 2*12){
            candidat.setPourcentage(candidat.getPourcentage()+ ( (this.pourcentageExp * 0.8F)/this.nbrCometences));

        }else if(duree > 12){
            candidat.setPourcentage(candidat.getPourcentage()+ ((this.pourcentageExp * 0.6F)/this.nbrCometences));

        }else if(duree > 6){
            candidat.setPourcentage(candidat.getPourcentage()+ ((this.pourcentageExp * 0.55F)/this.nbrCometences));

        }else{
            candidat.setPourcentage(candidat.getPourcentage()+ ((this.pourcentageExp * 0.5F)/this.nbrCometences));
        }
        System.out.println("duree "+duree);

        if(this.listCtrl.containsKey(candidat.getCandidat().getId())){
            for(CandidatPondere cp : this.listCandidats){
                if(cp.getCandidat().getId() == candidat.getCandidat().getId()){
                    cp.setPourcentage(cp.getPourcentage()+candidat.getPourcentage());
                    break;
                }
            }
        }else{
            this.listCandidats.add(candidat);
            this.listCtrl.put(candidat.getCandidat().getId(), true);
        }
        System.out.println("candidat "+candidat.getCandidat().getId()+"valeur "+candidat.getPourcentage());
    }

    private int nombreMois(Date debut, Date fin){ return (fin.getYear()-debut.getYear())*12 + fin.getMonth() - debut.getMonth(); }


}
