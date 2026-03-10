# 🏠 hypesquad-collector

> 🚫 UI から消えた Discord HypeSquad バッジを、コマンド一発で取得・削除できる CLI ツール

🌐 **日本語** | [English](docs/README.en.md) | [中文](docs/README.zh.md) | [한국어](docs/README.ko.md) | [Français](docs/README.fr.md) | [Deutsch](docs/README.de.md) | [Русский](docs/README.ru.md)

---

## ⚡ 実行コマンド
| バッジ | やりたいこと | コマンド |
|---|---|---|
| ![Bravery](images/bravery.png) | 💜 Bravery に設定 | `npx hypesquad --bravery` |
| ![Brilliance](images/brilliance.png) | 🧡 Brilliance に設定 | `npx hypesquad --brilliance` |
| ![Balance](images/balance.png) | 💚 Balance に設定 | `npx hypesquad --balance` |
| ❌ | ❌ バッジを外す | `npx hypesquad --remove` |
| 👀 | まず動作だけ確認する | `npx hypesquad --bravery --dry-run` |

実行後に `Discord token:` と表示されるので、トークンを貼り付けて Enter を押してください。

トークンの見方がわからない場合は、下の [🔑 TOKEN の閲覧方法](#-token-の閲覧方法) を確認してください。

コマンドのあとに `--dry-run` オプションを付けると、実際にバッジを変更せずリクエスト内容だけ確認できます。

---

## 🔑 TOKEN の閲覧方法

「トークン」とは、あなたの Discord アカウントを識別するための長い文字列です。以下の手順でコピーします。

1. **ブラウザ**（Chrome, Brave, Edge など）で [Discord](https://discord.com/channels/@me) を開く
   - ⚠️ アプリ版ではなく **ブラウザ版** を使ってください
2. キーボードで **開発者ツール** を開く
   - Windows: `F12` キー
   - Mac: `Cmd + Option + I`（3つ同時押し）
3. 画面右側（または下側）にパネルが出現 → 上部の **「Network」** タブをクリック
   - 見つからない場合は `>>` をクリックすると隠れているタブが出てきます
4. Discord に戻り、適当なサーバーの適当なチャンネルで **何かメッセージを送信**
   - 「あ」や「test」など、何でも OK です
5. 開発者ツールの左側に **`messages`** というリクエストが表示される → **クリック**
6. 右側に詳細が表示される → **「Headers」** タブをクリック
7. 下にスクロールして **「Request Headers」** セクションを探す
8. **`Authorization`** という項目を見つけて、その右側の長い文字列を **右クリック → コピー** ✅

> ⚠️ **この文字列（トークン）は絶対に他人と共有しないでください！**
> トークンがあれば、あなたのアカウントで何でもできてしまいます。
> パスワードと同じくらい大切なものです 🔐

---

## ❓ トラブルシューティング
<details>
<summary>開く</summary>

### 「npx が見つかりません」と出る

→ もう一度同じコマンドを実行してください。環境によっては Node.js の準備に少し時間がかかることがあります。

### 「brew が見つかりません」と出る

→ Mac では Homebrew を使って Node.js を補完します。自動導入に失敗した場合は、[Homebrew 公式サイト](https://brew.sh/ja/) または [Node.js 公式サイト](https://nodejs.org/ja) から先にインストールしてください。

### 「TOKEN の見方がわからない」

→ 上の [🔑 TOKEN の閲覧方法](#-token-の閲覧方法) を確認してください。

### 「Failed (401)」と出る

→ トークンが間違っているか、期限切れです。上の手順で取り直してください。

### 「Failed (429)」と出る

→ 短時間にリクエストを送りすぎです。数分待ってからもう一度試してください。

### バッジが変わらない

→ Discord を一度閉じて開き直すと反映されることがあります。
</details>
