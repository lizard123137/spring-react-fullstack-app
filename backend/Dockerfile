FROM maven:3.9-eclipse-temurin-23-alpine AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:23-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "app.jar" ]