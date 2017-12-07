# pm-core

create database IMP;
use IMP;

modifier dans persistence.xml la config user/pwd
mvn package
mvn wildfly-swarm:package


java -Dswarm.ds.connection.url="jdbc:mysql://localhost:3306/IMP?useSSL=false" -Dswarm.http.port="9090" -jar target/pm-core-swarm.jar
-Dswarm.option.... pour propriétés




VOIR dans le dossier back
projet avec wildfly-swarm créé
pour lancer il faut faire:
mvn clean install
java -jar target/back-swarm.jar 

Après il faut aller sur http://localhost:8080/pm/rest/user
pour voir la réponse du serveur
Les dépendances jboss sont supprimées sinon on peut pas accéder aux routes, il faut voir si on en a vraiment besoin
 
