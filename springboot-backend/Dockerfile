FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build/target/springboot-backend-0.0.1-SNAPSHOT.jar springboot-backend.jar
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "springboot-backend.jar"]