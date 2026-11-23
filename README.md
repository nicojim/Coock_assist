# MaxiMangeMange V6

Ajouts : import URL de recettes avec données structurées schema.org/Recipe via fonction Vercel `/api/import-recipe`, et reconnaissance OCR automatique des photos avec Tesseract.js (chargement depuis CDN).

## Déploiement
Publier le contenu de ce dossier sur Vercel en tant que projet statique avec fonctions Node.js. Le dossier `api` doit être à la racine du projet. Ne pas publier seulement `index.html`. HTTPS requis pour la PWA.

## Limites
Les sites qui bloquent l'accès automatisé ou n'exposent pas de données structurées ne sont pas importables. La photo doit contenir du texte lisible et l'OCR peut commettre des erreurs. L'OCR nécessite Internet lors du chargement initial; les données de recettes restent stockées localement dans le navigateur. Les URL envoyées au service Vercel sont transmises au serveur pour extraction.

Les fonctions de la V5 (recettes recalculées, courses et sauvegarde automatique) sont conservées.
