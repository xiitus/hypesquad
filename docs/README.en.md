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

## 🚀 Quick Start

### Step 1 — 🔑 Get your Discord token

1. Open [Discord](https://discord.com/channels/@me) in your browser
2. Press `F12` (Mac: `Cmd + Option + I`) to open **Developer Tools**
3. Click the **Network** tab at the top
4. **Send a message** in any channel
5. A `messages` request appears on the left → click it
6. Open the **Headers** tab on the right
7. Copy the `Authorization` value from **Request Headers** ✅

> ⚠️ **Never share your token with anyone.** It grants full access to your account.

### Step 2 — ⚡ Run the command

```bash
npx hypesquad --<badge-name>
```

You'll be prompted to enter your token. Paste the value from Step 1.

🔒 Your token is masked with `****` while typing.

### Step 3 — ✅ Done!

Check your profile — if the badge is there, you're all set 🎉

---

## 📖 Examples

```bash
# 💜 Set to Bravery
npx hypesquad --bravery

# 🧡 Set to Brilliance
npx hypesquad --brilliance

# 💚 Set to Balance
npx hypesquad --balance

# ❌ Remove badge
npx hypesquad --remove
```

---

## 🧪 Dry Run

Preview the request without actually sending it.

```bash
npx hypesquad --bravery --dry-run
```

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```
