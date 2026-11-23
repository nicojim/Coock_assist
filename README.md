# Ma cuisine — première version

Application web mobile (PWA) en français, pensée pour iPhone.

## Lancer en local
Ouvrir `index.html` dans un navigateur pour tester les fonctionnalités de base. Pour l'installation PWA et le mode hors-ligne, servir le dossier en HTTPS (ou localhost), car les service workers ne fonctionnent pas depuis `file://`.

## Publier
Déployer les fichiers du dossier sur un hébergeur statique HTTPS (par exemple Netlify, Vercel ou GitHub Pages). Puis ouvrir l'URL dans Safari sur iPhone > Partager > Sur l'écran d'accueil.

## Fonctionnalités V1
- Création et stockage local des recettes dans le navigateur (`localStorage`).
- Saisie manuelle et extraction simple d'ingrédients à partir de lignes comme `500 g de semoule`.
- Photo jointe à une recette (stockée sur l'appareil).
- Mise à l'échelle des quantités selon le nombre de personnes.
- Estimations par adulte pour plusieurs ingrédients courants.
- Liste de courses regroupée par famille, cases à cocher.
- Pas de compte ni de serveur de données.

## Limites assumées de cette V1
- Le champ URL conserve la source mais ne lit pas automatiquement le contenu de la page : les sites bloquent souvent l'accès direct depuis un navigateur (CORS / protections).
- La photo est jointe à la recette mais le texte de l'image n'est pas encore reconnu automatiquement.
- L'analyse intelligente du texte libre, de photos et d'URL nécessite une brique OCR/IA et idéalement un petit backend sécurisé. Ne pas mettre une clé API secrète directement dans le code client.
- Les ingrédients estimés sont signalés dans les données, mais doivent être vérifiés selon la recette. Les quantités de sel, piment, épices et liquides ne sont pas automatiquement multipliées car elles dépendent de la préparation.

Les données restent dans le stockage du navigateur de cet appareil. Effacer les données du site ou changer de navigateur peut les supprimer. Export/sauvegarde à ajouter dans une prochaine version.
