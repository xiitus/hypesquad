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

## 📋 Voraussetzungen

Dieses Tool erfordert **Node.js**. Falls noch nicht installiert, bitte zuerst einrichten.

### 🍎 Mac

1. **Terminal** öffnen
   - `Cmd + Leertaste` drücken, „Terminal" eingeben → Enter
2. Folgenden Befehl einfügen und Enter drücken:

```bash
brew install node
```

> 💡 Falls `brew` nicht verfügbar ist, lade den Installer von der [Node.js-Website](https://nodejs.org/de) herunter.

### 🪟 Windows

1. Gehe zur [Node.js-Website](https://nodejs.org/de)
2. Klicke auf den **grünen „LTS"-Button** zum Download
3. Öffne die heruntergeladene Datei und folge den Installationsschritten
4. **Starte den PC neu** nach der Installation

### ✅ Installation prüfen

Öffne das Terminal (Windows: **PowerShell**) und führe aus:

```bash
node -v
```

Wenn etwas wie `v20.xx.x` angezeigt wird, ist alles bereit 👍

---

## 🚀 Anleitung (3 Schritte)

### Schritt 1 — 🔑 Discord-Token abrufen

Ein „Token" ist eine lange Zeichenkette, die dein Discord-Konto identifiziert. So kopierst du ihn:

1. Öffne [Discord](https://discord.com/channels/@me) im **Browser** (Chrome, Brave, Edge usw.)
   - ⚠️ Verwende die **Browser-Version**, nicht die Desktop-App

2. Öffne die **Entwicklertools**
   - Windows: Drücke `F12`
   - Mac: Drücke `Cmd + Option + I` (alle drei gleichzeitig)

3. Ein Panel erscheint rechts (oder unten) → klicke oben auf den **„Network"**-Tab
   - Falls nicht sichtbar, klicke auf `>>` um versteckte Tabs anzuzeigen

4. Gehe zurück zu Discord und **sende eine Nachricht** in einem beliebigen Kanal
   - Irgendetwas wie „hi" oder „test" reicht

5. Links in den Entwicklertools erscheint eine **`messages`**-Anfrage → **klicke darauf**

6. Rechts werden Details angezeigt → klicke auf den **„Headers"**-Tab

7. Scrolle nach unten und finde den Abschnitt **„Request Headers"**

8. Finde **`Authorization`** und **Rechtsklick → Kopieren** der langen Zeichenkette daneben ✅

> ⚠️ **Teile diesen Token niemals mit anderen!**
> Mit deinem Token kann jeder dein Konto vollständig kontrollieren.
> Behandle ihn wie ein Passwort 🔐

---

### Schritt 2 — ⚡ Befehl ausführen

Öffne das Terminal (Windows: PowerShell), füge Folgendes ein und drücke Enter:

```bash
npx hypesquad --bravery
```

> 💡 Ersetze `--bravery` durch `--brilliance` oder `--balance` für ein anderes House.

Du wirst gefragt:

```
Discord token:
```

**Füge** den in Schritt 1 kopierten Token ein und drücke Enter.

- Windows: `Strg + V` zum Einfügen
- Mac: `Cmd + V` zum Einfügen

🔒 Die Eingabe wird als `****` angezeigt (aus Sicherheitsgründen sind die Zeichen nicht sichtbar).

Wenn `Done: Set to bravery (204)` erscheint, hat es geklappt 🎉

---

### Schritt 3 — ✅ Abzeichen überprüfen

1. Klicke auf Discord auf dein Profilbild → öffne dein **Profil**
2. Wenn das HypeSquad-Abzeichen angezeigt wird, bist du fertig! 🥳

---

## 📖 Befehlsübersicht

| Was du willst | Befehl |
|---|---|
| 💜 Auf Bravery setzen | `npx hypesquad --bravery` |
| 🧡 Auf Brilliance setzen | `npx hypesquad --brilliance` |
| 💚 Auf Balance setzen | `npx hypesquad --balance` |
| ❌ Abzeichen entfernen | `npx hypesquad --remove` |

> 💡 Du verwendest pnpm oder bun?
> ```bash
> pnpm dlx hypesquad --bravery
> bunx hypesquad --bravery
> ```

---

## 🧪 Testlauf (Vorschaumodus)

Sieh dir an, was gesendet würde, ohne das Abzeichen tatsächlich zu ändern. Probiere das zuerst, wenn du unsicher bist:

```bash
npx hypesquad --bravery --dry-run
```

Ausgabe:

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```

Wenn alles gut aussieht, entferne `--dry-run` und führe den Befehl richtig aus 👍

---

## ❓ FAQ

### „npx nicht gefunden"

→ Node.js ist nicht installiert. Siehe [📋 Voraussetzungen](#-voraussetzungen).

### „Failed (401)"

→ Dein Token ist falsch oder abgelaufen. Wiederhole Schritt 1.

### „Failed (429)"

→ Zu viele Anfragen in kurzer Zeit. Warte einige Minuten und versuche es erneut.

### Abzeichen hat sich nicht geändert

→ Schließe Discord und öffne es erneut — die Aktualisierung kann einen Moment dauern.
