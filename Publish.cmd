@echo off
title Publication G2M

echo.
echo ===== Publication du site =====
echo.

git add .
if errorlevel 1 (
  echo.
  echo *** ERREUR : "git add" a echoue. Rien n'a ete publie. ***
  pause
  exit /b 1
)

git diff --cached --quiet
if not errorlevel 1 (
  echo Aucun changement a committer ^(peut-etre deja fait avant^).
  goto do_push
)

:ask_message
set "MSG="
set /p MSG=Description de la modification :
if "%MSG%"=="" (
  echo.
  echo La description ne peut pas etre vide, merci d'en saisir une.
  echo.
  goto ask_message
)

git commit -m "%MSG%"
if errorlevel 1 (
  echo.
  echo *** ERREUR : "git commit" a echoue ^(voir le message ci-dessus^). ***
  echo *** Rien n'a ete envoye sur GitHub. ***
  pause
  exit /b 1
)

:do_push
git push
if errorlevel 1 (
  echo.
  echo *** ERREUR : "git push" a echoue ^(voir le message ci-dessus^). ***
  echo *** Le commit est enregistre en local mais PAS publie sur GitHub. ***
  echo *** Corrigez le probleme puis relancez Publish.cmd. ***
  pause
  exit /b 1
)

echo.
echo =========================================
echo Publication terminee !
echo Le site sera mis a jour sous 30 a 60 s.
echo =========================================
pause
