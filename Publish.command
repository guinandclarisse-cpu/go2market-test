#!/bin/bash
# Se placer automatiquement dans le dossier du script
cd "$(dirname "$0")" || exit 1

echo
echo "===== Publication du site ====="
echo

git add .
if [ $? -ne 0 ]; then
  echo
  echo '*** ERREUR : "git add" a échoué. Rien n’a été publié. ***'
  read -p "Appuie sur Entrée pour fermer..."
  exit 1
fi

if git diff --cached --quiet; then
  echo "Aucun changement à enregistrer, peut-être déjà publié."
else
  MSG=""
  while [ -z "$MSG" ]; do
    read -p "Description de la modification : " MSG
    if [ -z "$MSG" ]; then
      echo
      echo "La description ne peut pas être vide."
      echo
    fi
  done

  git commit -m "$MSG"
  if [ $? -ne 0 ]; then
    echo
    echo '*** ERREUR : "git commit" a échoué. ***'
    echo "*** Rien n’a été envoyé sur GitHub. ***"
    read -p "Appuie sur Entrée pour fermer..."
    exit 1
  fi
fi

git push
if [ $? -ne 0 ]; then
  echo
  echo '*** ERREUR : "git push" a échoué. ***'
  echo "*** Le commit est enregistré sur ton Mac, mais pas publié sur GitHub. ***"
  read -p "Appuie sur Entrée pour fermer..."
  exit 1
fi

echo
echo "========================================="
echo "Publication terminée !"
echo "Le site sera mis à jour sous 30 à 60 secondes."
echo "========================================="
echo
read -p "Appuie sur Entrée pour fermer..."
