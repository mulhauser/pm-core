#!/bin/bash


mvn package
mvn wildfly-swarm:package
cd target/
java -Dswarm.ds.connection.url="jdbc:mysql://localhost:3306/IMP?useSSL=false" -Dswarm.http.port="9090" -jar pm-core-swarm.jar