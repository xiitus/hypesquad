# 🏠 hypesquad-collector

> 🚫 Setze oder entferne ein Discord-HypeSquad-Abzeichen, das in der UI nicht mehr sichtbar ist, mit nur einem Befehl

🌐 [日本語](../README.md) | [English](README.en.md) | [中文](README.zh.md) | [한국어](README.ko.md) | [Français](README.fr.md) | **Deutsch** | [Русский](README.ru.md)

---

## ⚡ Befehle
| Abzeichen | Aktion | Befehl |
|---|---|---|
| ![Bravery](../images/bravery.png) | 💜 Auf Bravery setzen | `npx hypesquad --bravery` |
| ![Brilliance](../images/brilliance.png) | 🧡 Auf Brilliance setzen | `npx hypesquad --brilliance` |
| ![Balance](../images/balance.png) | 💚 Auf Balance setzen | `npx hypesquad --balance` |
| ❌ | ❌ Abzeichen entfernen | `npx hypesquad --remove` |
| 👀 | Erst nur Vorschau ansehen | `npx hypesquad --bravery --dry-run` |

Nach dem Ausführen erscheint `Discord token:`. Füge deinen Token ein und drücke Enter.

Wenn du nicht weißt, wie du den Token anzeigen kannst, siehe [🔑 TOKEN anzeigen](#-token-anzeigen).

Mit `--dry-run` siehst du nur die Anfrage-Vorschau, ohne das Abzeichen wirklich zu ändern.

---

## 🔑 TOKEN anzeigen

Der Token ist eine lange Zeichenkette, die dein Discord-Konto identifiziert. So kopierst du ihn:

1. Öffne [Discord](https://discord.com/channels/@me) im **Browser** (Chrome, Brave, Edge usw.)
   - ⚠️ Nutze die **Browser-Version**, nicht die Desktop-App
2. Öffne die **Entwicklertools**
   - Windows: `F12`
   - Mac: `Cmd + Option + I`
3. Öffne den Tab **Network**
   - Falls du ihn nicht siehst, klicke auf `>>`, um versteckte Tabs anzuzeigen
4. Gehe zurück zu Discord und sende in einem beliebigen Kanal eine Nachricht
   - Ein einfaches `hi` oder `test` reicht
5. Klicke links auf die Anfrage **`messages`**
6. Öffne den Tab **Headers**
7. Suche den Abschnitt **Request Headers**
8. Finde **`Authorization`** und kopiere per Rechtsklick die lange Zeichenkette daneben ✅

> ⚠️ Teile diesen Token niemals mit anderen. Er ist so sensibel wie ein Passwort.

---

## ❓ Fehlerbehebung
<details>
<summary>Öffnen</summary>

### „npx not found“

→ `npx` wird mit Node.js ausgeliefert. Dieses CLI installiert Homebrew oder Node.js nicht mehr automatisch, also installiere zuerst Node.js 18.18+ über die [Node.js-Website](https://nodejs.org/de) oder deinen bevorzugten Paketmanager.

### Ich weiß nicht, wie ich den TOKEN sehen kann

→ Siehe oben [🔑 TOKEN anzeigen](#-token-anzeigen).

### „Failed (401)“

→ Der Token ist falsch oder abgelaufen. Hole ihn mit den obigen Schritten erneut.

### „Failed (429)“

→ In kurzer Zeit wurden zu viele Anfragen gesendet. Warte ein paar Minuten und versuche es erneut.

### Das Abzeichen ändert sich nicht

→ Schließe Discord komplett und öffne es erneut. Die Aktualisierung kann einen Moment dauern.
</details>
