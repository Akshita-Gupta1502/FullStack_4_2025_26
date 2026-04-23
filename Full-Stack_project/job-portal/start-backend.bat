@echo off
echo Starting JobHub Backend...
cd /d "%~dp0backend"
call mvn spring-boot:run
pause
