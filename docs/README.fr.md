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

## 🚀 Démarrage rapide

### Étape 1 — 🔑 Obtenir votre jeton Discord

1. Ouvrez [Discord](https://discord.com/channels/@me) dans votre navigateur
2. Appuyez sur `F12` (Mac : `Cmd + Option + I`) pour ouvrir les **outils de développement**
3. Cliquez sur l'onglet **Network** en haut
4. **Envoyez un message** dans n'importe quel salon
5. Une requête `messages` apparaît à gauche → cliquez dessus
6. Ouvrez l'onglet **Headers** à droite
7. Copiez la valeur `Authorization` dans **Request Headers** ✅

> ⚠️ **Ne partagez jamais votre jeton.** Il donne un accès complet à votre compte.

### Étape 2 — ⚡ Exécuter la commande

```bash
npx hypesquad --<nom-du-badge>
```

Vous serez invité à saisir votre jeton. Collez la valeur copiée à l'étape 1.

🔒 Le jeton est masqué par `****` pendant la saisie.

### Étape 3 — ✅ Terminé !

Vérifiez votre profil — si le badge est là, c'est réussi 🎉

---

## 📖 Exemples

```bash
# 💜 Définir Bravery
npx hypesquad --bravery

# 🧡 Définir Brilliance
npx hypesquad --brilliance

# 💚 Définir Balance
npx hypesquad --balance

# ❌ Supprimer le badge
npx hypesquad --remove
```

---

## 🧪 Simulation

Aperçu de la requête sans l'envoyer réellement.

```bash
npx hypesquad --bravery --dry-run
```

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```
