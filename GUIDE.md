# Guide — Mettre Fil en ligne et l'installer comme app

## Ce que contient ce dossier

```
fil-pwa/
├── index.html       ← L'application complète
├── manifest.json    ← Fichier qui la rend installable
├── sw.js            ← Service Worker (mode hors-ligne)
├── icons/
│   ├── icon.svg
│   ├── icon-192x192.png
│   └── icon-512x512.png
└── GUIDE.md         ← Ce fichier
```

---

## ÉTAPE 1 — Mettre en ligne sur Netlify (5 minutes, gratuit)

1. Va sur **https://app.netlify.com/drop** (pas besoin de compte)
2. **Glisse-dépose le dossier `fil-pwa`** dans la zone indiquée
3. Netlify génère automatiquement une URL du type :
   `https://nom-aléatoire.netlify.app`
4. Tu peux partager cette URL immédiatement

> Pour avoir une URL personnalisée comme `fil-borderline.netlify.app` :
> - Crée un compte gratuit sur netlify.com
> - Dans ton site → Site settings → Change site name

---

## ÉTAPE 2 — Installer comme app sur Android

1. Ouvre l'URL de l'app dans **Chrome** sur Android
2. Une **bannière s'affiche en bas** : "Installer l'app Fil"
3. Appuie sur **Installer**
4. L'app apparaît sur l'écran d'accueil avec son icône

> Si la bannière ne s'affiche pas :
> - Menu Chrome (⋮) → "Ajouter à l'écran d'accueil"

---

## ÉTAPE 3 — Installer sur iPhone / iPad

Sur iOS, Chrome ne supporte pas l'installation directe.
Il faut utiliser **Safari** :

1. Ouvre l'URL dans **Safari**
2. Appuie sur le bouton **Partager** (rectangle avec flèche)
3. Sélectionne **"Sur l'écran d'accueil"**
4. Appuie sur **Ajouter**

---

## ÉTAPE 4 (optionnel) — Publier sur le Google Play Store

1. Va sur **https://www.pwabuilder.com**
2. Entre l'URL de ton app Netlify
3. Clique sur **"Package for stores"** → Android
4. Télécharge le fichier `.aab` généré
5. Crée un compte développeur Google Play (25€ unique)
6. Soumets l'app via **https://play.google.com/console**
7. Délai de validation : 3-7 jours

---

## Mettre à jour le contenu

Pour modifier l'app :
1. Édite le fichier `index.html` (tu peux l'ouvrir dans n'importe quel éditeur de texte)
2. Retourne sur Netlify → ton site → **Deploys** → glisse-dépose à nouveau le dossier

Les utilisateurs verront la mise à jour apparaître automatiquement.

---

## Mode hors-ligne

L'app fonctionne **sans connexion** une fois installée ou visitée une première fois.
Le service worker met en cache toutes les ressources.

---

## Code d'accès au mode admin

Code par défaut : **admin1234**

Pour le changer, ouvre `index.html` dans un éditeur et cherche :
```
const ADMIN_PWD = 'admin1234';
```
Remplace `admin1234` par le code de ton choix.

---

*Généré pour le projet Fil — Dr Sacha Valdenaire*
