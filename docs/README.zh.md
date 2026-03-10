# 🏠 hypesquad-collector

> 🚫 用一条命令设置或移除 Discord 界面里已经看不到的 HypeSquad 徽章

🌐 [日本語](../README.md) | [English](README.en.md) | **中文** | [한국어](README.ko.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

---

## ⚡ 运行命令
| 徽章 | 想做什么 | 命令 |
|---|---|---|
| ![Bravery](../images/bravery.png) | 💜 设置为 Bravery | `npx hypesquad --bravery` |
| ![Brilliance](../images/brilliance.png) | 🧡 设置为 Brilliance | `npx hypesquad --brilliance` |
| ![Balance](../images/balance.png) | 💚 设置为 Balance | `npx hypesquad --balance` |
| ❌ | ❌ 移除徽章 | `npx hypesquad --remove` |
| 👀 | 先只看预览 | `npx hypesquad --bravery --dry-run` |

运行后会显示 `Discord token:`，把你的 token 粘贴进去并按回车。

如果你不知道怎么查看 token，请看下面的 [🔑 TOKEN 查看方法](#-token-查看方法)。

加上 `--dry-run` 后，只会显示请求内容，不会真的修改徽章。

---

## 🔑 TOKEN 查看方法

TOKEN 是一串用来识别你的 Discord 账号的长字符串。可以按下面的方法复制：

1. 用 **浏览器**（Chrome、Brave、Edge 等）打开 [Discord](https://discord.com/channels/@me)
   - ⚠️ 请使用**浏览器版**，不要用桌面客户端
2. 打开**开发者工具**
   - Windows：`F12`
   - Mac：`Cmd + Option + I`
3. 打开 **Network** 标签
   - 如果没看到，可以点 `>>` 展开隐藏标签
4. 回到 Discord，在任意频道发送一条消息
   - 发 `hi` 或 `test` 都可以
5. 点击左侧列表里的 **`messages`** 请求
6. 打开 **Headers** 标签
7. 找到 **Request Headers** 区域
8. 找到 **`Authorization`**，右键复制它右边的长字符串 ✅

> ⚠️ 不要把这个 TOKEN 分享给任何人。它和密码一样重要。

---

## ❓ 故障排查
<details>
<summary>展开</summary>

### 提示 “npx not found”

→ 再执行一次同样的命令。有些环境里，Node.js 的准备会稍微慢一点。

### 提示 “brew not found”

→ 在 macOS 上，会通过 Homebrew 自动安装 Node.js。如果自动安装失败，请先到 [Homebrew 官网](https://brew.sh/) 或 [Node.js 官网](https://nodejs.org/zh-cn) 手动安装。

### 不知道怎么查看 TOKEN

→ 请看上面的 [🔑 TOKEN 查看方法](#-token-查看方法)。

### 提示 “Failed (401)”

→ TOKEN 错了或者已经失效。请按上面的步骤重新获取。

### 提示 “Failed (429)”

→ 短时间内请求太多了。等几分钟再试。

### 徽章没有变化

→ 关掉 Discord 再重新打开，有时需要一点时间刷新。
</details>
