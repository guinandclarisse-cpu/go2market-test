@echo off
echo ===========================================
echo Publication du site G2M
echo ===========================================

git add .
git commit -m "Mise a jour automatique"
git push

echo.
echo Publication terminee.
pause