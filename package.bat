cd UserService
call mvnw package -DskipTests
cd ../
@REM cd PostService
@REM call mvnw package -DskipTests
@REM cd../
cd API-Gateway
call mvnw package -DskipTests
cd../
cd SvcRegistry
call mvnw package -DskipTests
cd../
@REM cd EmailService
@REM call mvnw package -DskipTests
@REM cd../
call docker compose up --build