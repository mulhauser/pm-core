# pm-core

create database IMP;
use IMP;

modifier dans persistence.xml la config user/pwd
mvn package
mvn wildfly-swarm:package


java -Dswarm.ds.connection.url="jdbc:mysql://localhost:3306/IMP?useSSL=false" -jar target/pm-core-swarm.jar
