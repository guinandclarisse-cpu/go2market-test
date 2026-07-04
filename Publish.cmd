@echo off
title Publication G2M

echo.
echo ===== Publication du site =====
echo.

git add .

set /p MSG=Description de la modification :

git commit -m "%MSG%"

git push

echo.
echo =========================================
echo Publication terminee !
echo Le site sera mis a jour sous 30 a 60 s.
echo =========================================
pause