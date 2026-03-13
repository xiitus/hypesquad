# 🏠 hypesquad-collector

> 🚫 Discord のブラウザ版で、HypeSquad バッジを DevTools コンソールから取得・削除するための配布用スクリプト

このリポジトリは **GitHub Release 中心** で配布します。npm / CLI / Homebrew 前提ではありません。

---

## ⚡ 使い方

1. **Releases** から最新の `hypesquad-console.js` を開く
2. 中身をそのまま **全部コピー**
3. ブラウザ版の [Discord](https://discord.com/channels/@me) を開く
4. 開発者ツールの **Console** を開く
5. コピーしたスクリプトを貼り付けて実行する
6. 表示されるプロンプトに従って、`action` / `token` / `dry run` を入力する

対応アクション:

| アクション | 内容 |
| --- | --- |
| `bravery` | Bravery に設定 |
| `brilliance` | Brilliance に設定 |
| `balance` | Balance に設定 |
| `remove` | バッジを外す |

---

## 🔑 TOKEN の見方

1. **ブラウザ版 Discord** を開く
2. **開発者ツール** を開く
  - Windows: `F12`
  - Mac: `Cmd + Option + I`
3. **Network** タブを開く
4. どこかのチャンネルで適当なメッセージを送る
5. 左側の `messages` リクエストをクリック
6. **Headers** タブを開く
7. **Request Headers** を探す
8. `Authorization` の値をコピーする

> ⚠️ このトークンは絶対に他人に渡さないでください。

---

## ❓ 補足

- スクリプトは **ブラウザの Console** で実行してください
- 成功判定は `204 No Content` 固定です
- `dry run` を `yes` にすると、実際には送信せず内容だけ確認します
- バッジが変わらないときは Discord を再読み込みしてください
