@echo off
echo Starting JobHub Frontend...
cd /d "%~dp0frontend"
call npm run dev
pause
