# 🏠 hypesquad-collector

> 🚫 Set or remove Discord HypeSquad badges that disappeared from the UI with a single command

🌐 [日本語](../README.md) | **English** | [中文](README.zh.md) | [한국어](README.ko.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

---

## ⚡ Commands
| Badge | What you want | Command |
|---|---|---|
| ![Bravery](../images/bravery.png) | 💜 Set to Bravery | `npx hypesquad --bravery` |
| ![Brilliance](../images/brilliance.png) | 🧡 Set to Brilliance | `npx hypesquad --brilliance` |
| ![Balance](../images/balance.png) | 💚 Set to Balance | `npx hypesquad --balance` |
| ❌ | ❌ Remove badge | `npx hypesquad --remove` |
| 👀 | Preview only | `npx hypesquad --bravery --dry-run` |

After running the command, you'll see `Discord token:`. Paste your token and press Enter.

If you don't know how to view your token, see [🔑 How to View Your TOKEN](#-how-to-view-your-token) below.

Adding `--dry-run` lets you preview the request without actually changing your badge.

---

## 🔑 How to View Your TOKEN

A token is a long string that identifies your Discord account. Copy it like this:

1. Open [Discord](https://discord.com/channels/@me) in your **browser** (Chrome, Brave, Edge, etc.)
   - ⚠️ Use the **browser version**, not the desktop app
2. Open **Developer Tools**
   - Windows: `F12`
   - Mac: `Cmd + Option + I`
3. Click the **Network** tab
   - If you don't see it, click `>>` to reveal hidden tabs
4. Go back to Discord and send any message in any channel
   - Anything like `hi` or `test` is fine
5. Click the **`messages`** request in the left panel
6. Open the **Headers** tab
7. Find the **Request Headers** section
8. Find **`Authorization`**, then right-click and copy the long string next to it ✅

> ⚠️ Never share this token with anyone. It should be treated like a password.

---

## ❓ Troubleshooting
<details>
<summary>Open</summary>

### "npx not found"

→ Run the same command one more time. On some environments, Node.js setup can take a little longer.

### "brew not found"

→ On macOS, Homebrew is used to install Node.js automatically. If that fails, install it first from the [Homebrew website](https://brew.sh/) or the [Node.js website](https://nodejs.org/).

### "I don't know how to view my TOKEN"

→ See [🔑 How to View Your TOKEN](#-how-to-view-your-token) above.

### "Failed (401)"

→ Your token is wrong or expired. Get it again using the steps above.

### "Failed (429)"

→ You sent too many requests in a short time. Wait a few minutes and try again.

### The badge did not change

→ Close Discord and open it again. Sometimes it takes a moment to refresh.
</details>
