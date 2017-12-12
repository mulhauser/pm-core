# pm-core

### Créer la BDD
```
create database IMP;
use IMP;
```

### Modifier dans persistence.xml la config user/pwd
```
mvn package
mvn wildfly-swarm:package
```

### Lancer le backend
```
java -Dswarm.ds.connection.url="jdbc:mysql://localhost:3306/IMP?useSSL=false" -Dswarm.http.port="9090" -jar target/pm-core-swarm.jar
-Dswarm.option.... pour propriétés
```

Après il faut aller sur [[Localhost]](http://localhost:8080/pm/rest/user) pour voir la réponse du serveur.
Les dépendances jboss sont supprimées sinon on peut pas accéder aux routes, il faut voir si on en a vraiment besoin

### Accès à la documentation du backend

En accédant à cette url : http://localhost:9090/rest/apiee, nous pouvons voir la documentation des routes

### Présentation live de l'évolution du projet
Installer Gource pour taper la commande suivante :
```
gource --logo .\front\src\assets\logo_small.png --title "iMatchProfil - Croissants" --background 565656 --font-size 20 --font-colour 000000 --hide filenames --bloom-intensity 0.6 --camera-mode overview --background-image bg_pres.jpg
```
 
### Emails des étudiants : :+1:
thomas2.denis@gmail.com (Principal)

thomas.denis2@etu.univ-lorraine.fr (Lucid Chart)

michelwolkowicz@yahoo.fr (Principal)

michel.wolkowicz@etu.univ-lorraine.fr (Lucid Chart)

remy.mulhauser4@etu.univ-lorraine.fr

flavien.mondy1@etu.univ-lorraine.fr

titem.lehamel4@etu.univ-lorraine.fr
