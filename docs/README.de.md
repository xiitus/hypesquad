# 🏠 hypesquad-collector

> 🚫 Discord HypeSquad-Abzeichen, die aus der Oberfläche verschwunden sind, mit einem einzigen Befehl setzen oder entfernen

🌐 [日本語](../README.md) | [English](README.en.md) | [中文](README.zh.md) | [한국어](README.ko.md) | [Français](README.fr.md) | **Deutsch** | [Русский](README.ru.md)

---

## 🎖️ Unterstützte Abzeichen

| Flag | House | Abzeichen |
|---|---|:---:|
| `--bravery` | HypeSquad Bravery | ![Bravery](../images/bravery.png) |
| `--brilliance` | HypeSquad Brilliance | ![Brilliance](../images/brilliance.png) |
| `--balance` | HypeSquad Balance | ![Balance](../images/balance.png) |
| `--remove` | Abzeichen entfernen | ❌ |

---

## 🚀 Schnellstart

### Schritt 1 — 🔑 Discord-Token abrufen

1. Öffne [Discord](https://discord.com/channels/@me) im Browser
2. Drücke `F12` (Mac: `Cmd + Option + I`) um die **Entwicklertools** zu öffnen
3. Klicke oben auf den **Network**-Tab
4. **Sende eine Nachricht** in einem beliebigen Kanal
5. Links erscheint eine `messages`-Anfrage → klicke darauf
6. Öffne rechts den **Headers**-Tab
7. Kopiere den `Authorization`-Wert aus den **Request Headers** ✅

> ⚠️ **Teile deinen Token niemals mit anderen.** Er gewährt vollen Zugriff auf dein Konto.

### Schritt 2 — ⚡ Befehl ausführen

```bash
npx hypesquad --<Abzeichen-Name>
```

Du wirst zur Eingabe des Tokens aufgefordert. Füge den in Schritt 1 kopierten Wert ein.

🔒 Der Token wird bei der Eingabe mit `****` maskiert.

### Schritt 3 — ✅ Fertig!

Überprüfe dein Profil — wenn das Abzeichen angezeigt wird, hat es geklappt 🎉

---

## 📖 Beispiele

```bash
# 💜 Auf Bravery setzen
npx hypesquad --bravery

# 🧡 Auf Brilliance setzen
npx hypesquad --brilliance

# 💚 Auf Balance setzen
npx hypesquad --balance

# ❌ Abzeichen entfernen
npx hypesquad --remove
```

---

## 🧪 Testlauf

Vorschau der Anfrage ohne tatsächliches Senden.

```bash
npx hypesquad --bravery --dry-run
```

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```
