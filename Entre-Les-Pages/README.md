# Entre les pages

Expérience littéraire interactive réalisée en HTML, CSS et JavaScript.

## Lancement local

```powershell
cd C:\Users\verto\Documents\Writings\Entre-Les-Pages
python -m http.server 4173
```

Puis ouvrir http://localhost:4173.

## GitHub Pages

1. Créer un dépôt GitHub nommé `Entre-Les-Pages`.
2. Ajouter ce dossier comme contenu du dépôt.
3. Pousser la branche `main`.
4. Dans **Settings → Pages**, sélectionner **GitHub Actions** comme source.

Le workflow `.github/workflows/deploy-pages.yml` publiera automatiquement le site à chaque poussée sur `main`.
