# 🏠 hypesquad-collector

> 🚫 Obtenez ou supprimez les badges Discord HypeSquad disparus de l'interface — en une seule commande

🌐 [日本語](../README.md) | [English](README.en.md) | [中文](README.zh.md) | [한국어](README.ko.md) | **Français** | [Deutsch](README.de.md) | [Русский](README.ru.md)

---

## 🎖️ Badges disponibles

| Option | House | Badge |
|---|---|:---:|
| `--bravery` | HypeSquad Bravery | ![Bravery](../images/bravery.png) |
| `--brilliance` | HypeSquad Brilliance | ![Brilliance](../images/brilliance.png) |
| `--balance` | HypeSquad Balance | ![Balance](../images/balance.png) |
| `--remove` | Supprimer le badge | ❌ |

---

## 📋 Prérequis

Cet outil nécessite **Node.js**. Si vous ne l'avez pas encore, installez-le d'abord.

### 🍎 Mac

1. Ouvrez le **Terminal**
   - Appuyez sur `Cmd + Espace`, tapez « Terminal » et appuyez sur Entrée
2. Collez la commande suivante et appuyez sur Entrée :

```bash
brew install node
```

> 💡 Si `brew` n'est pas disponible, téléchargez l'installateur depuis le [site officiel de Node.js](https://nodejs.org/fr).

### 🪟 Windows

1. Rendez-vous sur le [site officiel de Node.js](https://nodejs.org/fr)
2. Cliquez sur le **bouton vert « LTS »** pour télécharger
3. Ouvrez le fichier téléchargé et suivez les étapes d'installation
4. **Redémarrez votre PC** après l'installation

### ✅ Vérifier l'installation

Ouvrez le Terminal (Windows : **PowerShell**) et exécutez :

```bash
node -v
```

Si vous voyez quelque chose comme `v20.xx.x`, c'est bon 👍

---

## 🚀 Comment utiliser (3 étapes)

### Étape 1 — 🔑 Obtenir votre jeton Discord

Un « jeton » est une longue chaîne de caractères qui identifie votre compte Discord. Suivez ces étapes pour le copier.

1. Ouvrez [Discord](https://discord.com/channels/@me) dans votre **navigateur** (Chrome, Brave, Edge, etc.)
   - ⚠️ Utilisez la **version navigateur**, pas l'application de bureau

2. Ouvrez les **outils de développement**
   - Windows : appuyez sur `F12`
   - Mac : appuyez sur `Cmd + Option + I` (les trois en même temps)

3. Un panneau apparaît à droite (ou en bas) → cliquez sur l'onglet **« Network »** en haut
   - Si vous ne le trouvez pas, cliquez sur `>>` pour afficher les onglets masqués

4. Retournez sur Discord et **envoyez un message** dans n'importe quel salon
   - N'importe quoi comme « salut » ou « test »

5. Une requête **`messages`** apparaît à gauche dans les outils de développement → **cliquez dessus**

6. Les détails apparaissent à droite → cliquez sur l'onglet **« Headers »**

7. Faites défiler vers le bas et trouvez la section **« Request Headers »**

8. Trouvez **`Authorization`** et **clic droit → copier** la longue chaîne à côté ✅

> ⚠️ **Ne partagez jamais ce jeton avec qui que ce soit !**
> Avec votre jeton, n'importe qui peut contrôler entièrement votre compte.
> Traitez-le comme un mot de passe 🔐

---

### Étape 2 — ⚡ Exécuter la commande

Ouvrez le Terminal (Windows : PowerShell), collez ce qui suit et appuyez sur Entrée :

```bash
npx hypesquad --bravery
```

> 💡 Remplacez `--bravery` par `--brilliance` ou `--balance` pour une autre House.

Vous verrez ce message :

```
Discord token:
```

**Collez** le jeton copié à l'étape 1 et appuyez sur Entrée.

- Windows : `Ctrl + V` pour coller
- Mac : `Cmd + V` pour coller

🔒 Votre saisie s'affiche en `****` par sécurité (les caractères réels ne sont pas visibles).

Si vous voyez `Done: Set to bravery (204)`, c'est réussi 🎉

---

### Étape 3 — ✅ Vérifier votre badge

1. Sur Discord, cliquez sur votre avatar → ouvrez votre **Profil**
2. Si le badge HypeSquad s'affiche, c'est terminé ! 🥳

---

## 📖 Référence des commandes

| Ce que vous voulez | Commande |
|---|---|
| 💜 Définir Bravery | `npx hypesquad --bravery` |
| 🧡 Définir Brilliance | `npx hypesquad --brilliance` |
| 💚 Définir Balance | `npx hypesquad --balance` |
| ❌ Supprimer le badge | `npx hypesquad --remove` |

> 💡 Vous utilisez pnpm ou bun ?
> ```bash
> pnpm dlx hypesquad --bravery
> bunx hypesquad --bravery
> ```

---

## 🧪 Simulation (mode aperçu)

Visualisez la requête sans réellement modifier votre badge. Essayez d'abord si vous n'êtes pas sûr :

```bash
npx hypesquad --bravery --dry-run
```

Résultat :

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```

Si tout semble bon, retirez `--dry-run` et exécutez pour de vrai 👍

---

## ❓ FAQ

### « npx introuvable »

→ Node.js n'est pas installé. Voir [📋 Prérequis](#-prérequis).

### « Failed (401) »

→ Votre jeton est incorrect ou expiré. Recommencez à l'étape 1.

### « Failed (429) »

→ Trop de requêtes en peu de temps. Attendez quelques minutes et réessayez.

### Le badge n'a pas changé

→ Fermez et rouvrez Discord — l'actualisation peut prendre un moment.
