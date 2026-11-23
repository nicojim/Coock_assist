# MaxiMangeMange — V3

Application PWA pour iPhone, sans compte, avec stockage local.

## Nouveautés
- Extraction automatique des ingrédients lors de la saisie du texte (délai 350 ms), sans bouton.
- Après l’ajout aux courses, affichage des ingrédients recalculés et des étapes de préparation sous la liste.
- Nom MaxiMangeMange dans la page, l’onglet et le manifeste PWA.

## Utilisation
Publier le dossier sur un hébergeur HTTPS statique (Vercel, Netlify, etc.), ouvrir dans Safari, puis Partager > Sur l’écran d’accueil.

## Limites
L’extraction repose sur des règles locales, pas sur une IA : elle fonctionne surtout avec des lignes d’ingrédients comme `500 g de semoule`. Pour séparer les étapes, ajouter le titre `Préparation :`. Les quantités dans les étapes ne sont remplacées que si une correspondance exacte est reconnue ; contrôler les étapes avant de cuisiner. Photos et URL ne sont pas analysées automatiquement. Les données locales peuvent être perdues si le stockage du navigateur est effacé.

## V5
Lors de l’ajout d’une recette aux courses, la recette recalculée est automatiquement enregistrée dans « Mes recettes » avec ses ingrédients adaptés et les étapes reconnues. La recette originale est conservée.
