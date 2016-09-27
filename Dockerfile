FROM java:8

COPY ./build/libs/SpringReactTodoList-1.0-SNAPSHOT.jar /app.jar
EXPOSE 8080

CMD ["java", "-jar", "/app.jar"]
