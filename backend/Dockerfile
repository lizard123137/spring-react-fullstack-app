FROM openjdk:23-jdk

ARG JAR_FILE=target/*.jar

RUN  groupadd spring && useradd spring -g spring
USER spring:spring

COPY ${JAR_FILE} app.jar
ENTRYPOINT [ "java", "-jar", "/app.jar" ]