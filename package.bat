cd UserService
call mvnw package -DskipTests
cd ../
cd PostService
call mvnw package -DskipTests
cd../
cd API-Gateway
call mvnw package -DskipTests
cd../
cd SvcRegistry
call mvnw package -DskipTests
cd../
cd EmailService
call mvnw package -DskipTests
cd../
call docker compose up --build