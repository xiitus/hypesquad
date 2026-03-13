# 🏠 hypesquad-collector

> 🚫 Définissez ou supprimez un badge Discord HypeSquad disparu de l'interface avec une seule commande

🌐 [日本語](../README.md) | [English](README.en.md) | [中文](README.zh.md) | [한국어](README.ko.md) | **Français** | [Deutsch](README.de.md) | [Русский](README.ru.md)

---

## ⚡ Commandes
| Badge | Action | Commande |
|---|---|---|
| ![Bravery](../images/bravery.png) | 💜 Définir Bravery | `npx hypesquad --bravery` |
| ![Brilliance](../images/brilliance.png) | 🧡 Définir Brilliance | `npx hypesquad --brilliance` |
| ![Balance](../images/balance.png) | 💚 Définir Balance | `npx hypesquad --balance` |
| ❌ | ❌ Supprimer le badge | `npx hypesquad --remove` |
| 👀 | Voir seulement l'aperçu | `npx hypesquad --bravery --dry-run` |

Après l'exécution, `Discord token:` s'affiche. Collez votre token et appuyez sur Entrée.

Si vous ne savez pas comment afficher votre token, consultez [🔑 Comment voir votre TOKEN](#-comment-voir-votre-token).

Ajouter `--dry-run` permet de prévisualiser la requête sans modifier réellement le badge.

---

## 🔑 Comment voir votre TOKEN

Le token est une longue chaîne qui identifie votre compte Discord. Voici comment le copier :

1. Ouvrez [Discord](https://discord.com/channels/@me) dans votre **navigateur** (Chrome, Brave, Edge, etc.)
   - ⚠️ Utilisez la **version navigateur**, pas l'application de bureau
2. Ouvrez les **outils de développement**
   - Windows : `F12`
   - Mac : `Cmd + Option + I`
3. Ouvrez l'onglet **Network**
   - Si vous ne le voyez pas, cliquez sur `>>` pour afficher les onglets cachés
4. Retournez sur Discord et envoyez un message dans n'importe quel salon
   - Un simple `hi` ou `test` suffit
5. Cliquez sur la requête **`messages`** dans la liste de gauche
6. Ouvrez l'onglet **Headers**
7. Repérez la section **Request Headers**
8. Trouvez **`Authorization`**, puis faites clic droit pour copier la longue chaîne à droite ✅

> ⚠️ Ne partagez jamais ce token. Il doit être protégé comme un mot de passe.

---

## ❓ Dépannage
<details>
<summary>Ouvrir</summary>

### « npx not found »

→ `npx` est fourni avec Node.js. Ce CLI n'installe plus automatiquement Homebrew ni Node.js, donc installez d'abord Node.js 18.18+ depuis le [site de Node.js](https://nodejs.org/fr) ou via votre gestionnaire de paquets préféré.

### Je ne sais pas comment voir le TOKEN

→ Consultez [🔑 Comment voir votre TOKEN](#-comment-voir-votre-token) ci-dessus.

### « Failed (401) »

→ Le token est incorrect ou expiré. Récupérez-le de nouveau avec les étapes ci-dessus.

### « Failed (429) »

→ Trop de requêtes ont été envoyées en peu de temps. Attendez quelques minutes puis réessayez.

### Le badge ne change pas

→ Fermez Discord puis ouvrez-le de nouveau. L'actualisation peut prendre un moment.
</details>
