# 🏠 hypesquad-collector

> 🚫 Set or remove Discord HypeSquad badges that disappeared from the UI — with a single command

🌐 [日本語](../README.md) | **English** | [中文](README.zh.md) | [한국어](README.ko.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

---

## 🎖️ Supported Badges

| Flag | House | Badge |
|---|---|:---:|
| `--bravery` | HypeSquad Bravery | ![Bravery](../images/bravery.png) |
| `--brilliance` | HypeSquad Brilliance | ![Brilliance](../images/brilliance.png) |
| `--balance` | HypeSquad Balance | ![Balance](../images/balance.png) |
| `--remove` | Remove badge | ❌ |

---

## 📋 Prerequisites

This tool requires **Node.js**. If you don't have it yet, install it first.

### 🍎 Mac

1. Open **Terminal**
   - Press `Cmd + Space`, type "Terminal", and hit Enter
2. Paste the following and press Enter:

```bash
brew install node
```

> 💡 If `brew` isn't available, download the installer from the [Node.js website](https://nodejs.org/).

### 🪟 Windows

1. Go to the [Node.js website](https://nodejs.org/)
2. Click the **green "LTS" button** to download
3. Open the downloaded file and follow the installation steps
4. **Restart your PC** after installation

### ✅ Verify installation

Open Terminal (Windows: **PowerShell**) and run:

```bash
node -v
```

If you see something like `v20.xx.x`, you're good to go 👍

---

## 🚀 How to Use (3 Steps)

### Step 1 — 🔑 Get your Discord token

A "token" is a long string that identifies your Discord account. Follow these steps to copy it.

1. Open [Discord](https://discord.com/channels/@me) in your **browser** (Chrome, Brave, Edge, etc.)
   - ⚠️ Use the **browser version**, not the desktop app

2. Open **Developer Tools**
   - Windows: Press `F12`
   - Mac: Press `Cmd + Option + I` (all three at once)

3. A panel appears on the right (or bottom) → click the **"Network"** tab at the top
   - If you can't find it, click `>>` to reveal hidden tabs

4. Go back to Discord and **send any message** in any channel
   - Anything like "hi" or "test" is fine

5. A **`messages`** request appears on the left side of the developer tools → **click it**

6. Details appear on the right → click the **"Headers"** tab

7. Scroll down and find the **"Request Headers"** section

8. Find **`Authorization`** and **right-click → copy** the long string next to it ✅

> ⚠️ **Never share this token with anyone!**
> With your token, anyone can fully control your account.
> Treat it like a password 🔐

---

### Step 2 — ⚡ Run the command

Open Terminal (Windows: PowerShell), paste the following, and press Enter:

```bash
npx hypesquad --bravery
```

> 💡 Replace `--bravery` with `--brilliance` or `--balance` for a different House.

You'll be prompted:

```
Discord token:
```

**Paste** the token you copied in Step 1 and press Enter.

- Windows: `Ctrl + V` to paste
- Mac: `Cmd + V` to paste

🔒 Your input is shown as `****` for security (you won't see the actual characters).

If you see `Done: Set to bravery (204)`, it worked 🎉

---

### Step 3 — ✅ Check your badge

1. Click your avatar on Discord → open your **Profile**
2. If the HypeSquad badge is showing, you're done! 🥳

---

## 📖 Command Reference

| What you want | Command |
|---|---|
| 💜 Set to Bravery | `npx hypesquad --bravery` |
| 🧡 Set to Brilliance | `npx hypesquad --brilliance` |
| 💚 Set to Balance | `npx hypesquad --balance` |
| ❌ Remove badge | `npx hypesquad --remove` |

> 💡 Using pnpm or bun?
> ```bash
> pnpm dlx hypesquad --bravery
> bunx hypesquad --bravery
> ```

---

## 🧪 Dry Run (Preview Mode)

See what would be sent without actually changing your badge. Try this first if you're unsure:

```bash
npx hypesquad --bravery --dry-run
```

Output:

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```

If it looks good, remove `--dry-run` and run for real 👍

---

## ❓ FAQ

### "npx not found"

→ Node.js is not installed. See [📋 Prerequisites](#-prerequisites).

### "Failed (401)"

→ Your token is wrong or expired. Redo Step 1.

### "Failed (429)"

→ Too many requests in a short time. Wait a few minutes and try again.

### Badge didn't change

→ Close and reopen Discord — it may take a moment to refresh.
