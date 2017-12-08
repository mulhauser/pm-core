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

VOIR dans le dossier back
projet avec wildfly-swarm créé
pour lancer il faut faire:
```
mvn clean install
java -jar target/back-swarm.jar 
```

Après il faut aller sur [[Localhost]](http://localhost:8080/pm/rest/user) pour voir la réponse du serveur.
Les dépendances jboss sont supprimées sinon on peut pas accéder aux routes, il faut voir si on en a vraiment besoin
 
### Emails des étudiants : :+1:
thomas2.denis@gmail.com (Principal)

thomas.denis2@etu.univ-lorraine.fr (Lucid Chart)

michelwolkowicz@yahoo.fr (Principal)

michel.wolkowicz@etu.univ-lorraine.fr (Lucid Chart)

remy.mulhauser4@etu.univ-lorraine.fr

flavien.mondy1@etu.univ-lorraine.fr

titem.lehamel4@etu.univ-lorraine.fr
