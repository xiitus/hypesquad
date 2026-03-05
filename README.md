# 🏠 hypesquad-collector

> 🚫 UI から消えた Discord HypeSquad バッジを、コマンド一発で取得・削除できる CLI ツール

🌐 **日本語** | [English](docs/README.en.md) | [中文](docs/README.zh.md) | [한국어](docs/README.ko.md) | [Français](docs/README.fr.md) | [Deutsch](docs/README.de.md) | [Русский](docs/README.ru.md)

---

## ⚡ 実行コマンド

| やりたいこと | コマンド |
|---|---|
| 💜 Bravery に設定 | `npx hypesquad --bravery` |
| 🧡 Brilliance に設定 | `npx hypesquad --brilliance` |
| 💚 Balance に設定 | `npx hypesquad --balance` |
| ❌ バッジを外す | `npx hypesquad --remove` |

> 💡 pnpm や bun を使っている場合:
> ```bash
> pnpm dlx hypesquad --bravery
> bunx hypesquad --bravery
> ```

実行後に `Discord token:` と表示されるので、トークンを貼り付けて Enter を押してください。

---

## 🎖️ 対応バッジ

| フラグ | House | バッジ |
|---|---|:---:|
| `--bravery` | HypeSquad Bravery | ![Bravery](images/bravery.png) |
| `--brilliance` | HypeSquad Brilliance | ![Brilliance](images/brilliance.png) |
| `--balance` | HypeSquad Balance | ![Balance](images/balance.png) |
| `--remove` | バッジ削除 | ❌ |

---

## 📋 事前準備

このツールを使うには **Node.js** が必要です。まだ入れていない方は先にインストールしてください。

### 🍎 Mac の場合

1. **ターミナル** を開く
   - `Cmd + Space` を押して「ターミナル」と入力 → Enter
2. 以下のコマンドをコピーして貼り付け、Enter を押す

```bash
brew install node
```

> 💡 `brew` が使えない場合は [Node.js 公式サイト](https://nodejs.org/ja) からインストーラーをダウンロードしてください。

### 🪟 Windows の場合

1. [Node.js 公式サイト](https://nodejs.org/ja) にアクセス
2. **「LTS」と書かれた緑のボタン** をクリックしてダウンロード
3. ダウンロードしたファイルを開いて、画面の指示に従ってインストール
4. インストールが終わったら PC を **再起動**

### ✅ インストールできたか確認する

ターミナル（Windows は **PowerShell**）を開いて以下を実行:

```bash
node -v
```

`v20.xx.x` のようにバージョンが表示されれば OK 👍

---

## 🚀 使い方（3ステップ）

### Step 1 — 🔑 Discord のトークンを取得する

「トークン」とは、あなたの Discord アカウントを識別するための長い文字列です。以下の手順でコピーします。

1. **ブラウザ**（Chrome, Brave, Edge など）で [Discord](https://discord.com/channels/@me) を開く
   - ⚠️ アプリ版ではなく **ブラウザ版** を使ってください

2. キーボードで **開発者ツール** を開く
   - Windows: `F12` キー
   - Mac: `Cmd + Option + I`（3つ同時押し）

3. 画面右側（または下側）にパネルが出現 → 上部の **「Network」** タブをクリック
   - 見つからない場合は `>>` をクリックすると隠れているタブが出てきます

4. Discord に戻り、適当なサーバーの適当なチャンネルで **何かメッセージを送信**
   - 「あ」とか「test」とか、何でも OK です

5. 開発者ツールの左側に **`messages`** というリクエストが表示される → **クリック**

6. 右側に詳細が表示される → **「Headers」** タブをクリック

7. 下にスクロールして **「Request Headers」** セクションを探す

8. **`Authorization`** という項目を見つけて、その右側の長い文字列を **右クリック → コピー** ✅

> ⚠️ **この文字列（トークン）は絶対に他人と共有しないでください！**
> トークンがあれば、あなたのアカウントで何でもできてしまいます。
> パスワードと同じくらい大切なものです 🔐

---

### Step 2 — ⚡ コマンドを実行する

ターミナル（Windows は PowerShell）を開いて、以下をコピー＆ペーストして Enter:

```bash
npx hypesquad --bravery
```

> 💡 `--bravery` の部分を `--brilliance` や `--balance` に変えると、別の House になります。

すると、こう聞かれます:

```
Discord token:
```

Step 1 でコピーしたトークンを **貼り付け** て Enter を押してください。

- Windows: `Ctrl + V` で貼り付け
- Mac: `Cmd + V` で貼り付け

🔒 入力中は画面に `****` と表示されます（セキュリティのため中身は見えません）。

`Done: Set to bravery (204)` と表示されれば成功です 🎉

---

### Step 3 — ✅ バッジを確認する

1. Discord で自分のアイコンをクリック → **プロフィール** を開く
2. HypeSquad バッジが表示されていれば完了！ 🥳

---

## 🧪 ドライラン（お試しモード）

実際にバッジを変更せず、「こういうリクエストを送るよ」というプレビューだけ見れます。初めてで不安な方はまずこちらをお試しください:

```bash
npx hypesquad --bravery --dry-run
```

こんな表示が出ます:

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```

問題なさそうなら `--dry-run` を外して本番実行してください 👍

---

## ❓ よくある質問

### 「npx が見つかりません」と出る

→ Node.js がインストールされていません。[📋 事前準備](#-事前準備) を確認してください。

### 「Failed (401)」と出る

→ トークンが間違っているか、期限切れです。Step 1 からやり直してください。

### 「Failed (429)」と出る

→ 短時間にリクエストを送りすぎです。数分待ってからもう一度試してください。

### バッジが変わらない

→ Discord を一度閉じて開き直すと反映されることがあります。
