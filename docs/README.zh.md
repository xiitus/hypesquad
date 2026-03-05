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

## 📋 前提条件

本工具需要 **Node.js**。如果尚未安装，请先安装。

### 🍎 Mac

1. 打开 **终端**
   - 按 `Cmd + Space`，输入「终端」，按回车
2. 粘贴以下命令并按回车：

```bash
brew install node
```

> 💡 如果没有 `brew`，请从 [Node.js 官网](https://nodejs.org/zh-cn) 下载安装包。

### 🪟 Windows

1. 访问 [Node.js 官网](https://nodejs.org/zh-cn)
2. 点击 **绿色的「LTS」按钮** 下载
3. 打开下载的文件，按照提示完成安装
4. 安装完成后 **重启电脑**

### ✅ 验证安装

打开终端（Windows 请用 **PowerShell**），运行：

```bash
node -v
```

显示 `v20.xx.x` 之类的版本号即为成功 👍

---

## 🚀 使用方法（3 步）

### 第 1 步 — 🔑 获取 Discord 令牌

「令牌」是一串用于识别你 Discord 账户的长字符串。按以下步骤复制：

1. 用 **浏览器**（Chrome、Brave、Edge 等）打开 [Discord](https://discord.com/channels/@me)
   - ⚠️ 请使用 **浏览器版**，而非桌面客户端

2. 打开 **开发者工具**
   - Windows：按 `F12`
   - Mac：按 `Cmd + Option + I`（三个键同时按）

3. 右侧（或底部）出现面板 → 点击顶部的 **「Network」** 标签
   - 找不到的话，点击 `>>` 可以显示隐藏的标签

4. 回到 Discord，在任意频道 **发送一条消息**
   - 随便发什么都可以，比如「你好」或「test」

5. 开发者工具左侧出现 **`messages`** 请求 → **点击它**

6. 右侧显示详情 → 点击 **「Headers」** 标签

7. 向下滚动，找到 **「Request Headers」** 部分

8. 找到 **`Authorization`**，**右键 → 复制** 旁边的长字符串 ✅

> ⚠️ **永远不要把令牌分享给任何人！**
> 有了令牌，任何人都能完全控制你的账户。
> 请像对待密码一样保管它 🔐

---

### 第 2 步 — ⚡ 执行命令

打开终端（Windows 请用 PowerShell），粘贴以下内容并按回车：

```bash
npx hypesquad --bravery
```

> 💡 把 `--bravery` 改成 `--brilliance` 或 `--balance` 可以选择不同的 House。

系统会提示：

```
Discord token:
```

**粘贴** 第 1 步复制的令牌，然后按回车。

- Windows：`Ctrl + V` 粘贴
- Mac：`Cmd + V` 粘贴

🔒 输入时屏幕显示 `****`（出于安全考虑，不会显示实际内容）。

看到 `Done: Set to bravery (204)` 就表示成功了 🎉

---

### 第 3 步 — ✅ 确认徽章

1. 在 Discord 中点击你的头像 → 打开 **个人资料**
2. 如果 HypeSquad 徽章已经显示，就大功告成了！ 🥳

---

## 📖 命令一览

| 目标 | 命令 |
|---|---|
| 💜 设置为 Bravery | `npx hypesquad --bravery` |
| 🧡 设置为 Brilliance | `npx hypesquad --brilliance` |
| 💚 设置为 Balance | `npx hypesquad --balance` |
| ❌ 移除徽章 | `npx hypesquad --remove` |

> 💡 使用 pnpm 或 bun？
> ```bash
> pnpm dlx hypesquad --bravery
> bunx hypesquad --bravery
> ```

---

## 🧪 模拟运行（预览模式）

不实际更改徽章，仅查看将要发送的请求。不确定时请先使用：

```bash
npx hypesquad --bravery --dry-run
```

输出：

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```

确认没问题后，去掉 `--dry-run` 正式执行 👍

---

## ❓ 常见问题

### 提示「找不到 npx」

→ 未安装 Node.js。请查看 [📋 前提条件](#-前提条件)。

### 提示「Failed (401)」

→ 令牌错误或已过期。请重新执行第 1 步。

### 提示「Failed (429)」

→ 短时间内请求过多。请等待几分钟后重试。

### 徽章没有变化

→ 关闭并重新打开 Discord，可能需要等一会儿才能生效。
