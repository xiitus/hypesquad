# 🏠 hypesquad-collector

> 🚫 一条命令即可设置或移除已从 UI 中消失的 Discord HypeSquad 徽章

🌐 [日本語](../README.md) | [English](README.en.md) | **中文** | [한국어](README.ko.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

---

## 🎖️ 支持的徽章

| 参数 | House | 徽章 |
|---|---|:---:|
| `--bravery` | HypeSquad Bravery | ![Bravery](../images/bravery.png) |
| `--brilliance` | HypeSquad Brilliance | ![Brilliance](../images/brilliance.png) |
| `--balance` | HypeSquad Balance | ![Balance](../images/balance.png) |
| `--remove` | 移除徽章 | ❌ |

---

## 🚀 快速开始

### 第 1 步 — 🔑 获取 Discord 令牌

1. 在浏览器中打开 [Discord](https://discord.com/channels/@me)
2. 按 `F12`（Mac: `Cmd + Option + I`）打开 **开发者工具**
3. 点击顶部的 **Network** 标签
4. 在任意频道中 **发送一条消息**
5. 左侧出现 `messages` 请求 → 点击它
6. 打开右侧的 **Headers** 标签
7. 从 **Request Headers** 中复制 `Authorization` 的值 ✅

> ⚠️ **请勿将令牌分享给任何人。** 它将授予对您账户的完全访问权限。

### 第 2 步 — ⚡ 执行命令

```bash
npx hypesquad --<徽章名>
```

系统会提示输入令牌，粘贴第 1 步中复制的值即可。

🔒 输入时令牌会以 `****` 形式遮蔽。

### 第 3 步 — ✅ 完成！

查看个人资料，确认徽章已显示即为成功 🎉

---

## 📖 使用示例

```bash
# 💜 设置为 Bravery
npx hypesquad --bravery

# 🧡 设置为 Brilliance
npx hypesquad --brilliance

# 💚 设置为 Balance
npx hypesquad --balance

# ❌ 移除徽章
npx hypesquad --remove
```

---

## 🧪 模拟运行

不实际发送请求，仅预览发送内容。

```bash
npx hypesquad --bravery --dry-run
```

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```
