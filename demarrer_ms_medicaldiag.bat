@echo off
title MS MedicalDiag - Seif Chaouch (Kine) & Dr. Malek Masri (Medecin)
cd /d "%~dp0"
echo ========================================================
echo    LANCEMENT DE MS MedicalDiag EN LIGNE (4G)
echo    Kine : Seif Chaouch ^| Medecin : Dr. Malek Masri
echo ========================================================
echo.
echo 1. Lancement du serveur et de la base de donnees...
start /B node server.js
timeout /t 3 /nobreak >nul
echo.
echo 2. Lancement du tunnel Cloudflare 4G (Protocole HTTP/2 ultra-stable)...
npx.cmd --yes cloudflared tunnel --protocol http2 --url http://127.0.0.1:4173
pause
