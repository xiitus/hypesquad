# 🏠 hypesquad-collector

> 🚫 UI から消えた Discord HypeSquad バッジを、コマンド一発で取得・削除できる CLI ツール

---

## 🎖️ 対応バッジ

| フラグ | House | バッジ |
|---|---|:---:|
| `--bravery` | HypeSquad Bravery | ![Bravery](images/bravery.png) |
| `--brilliance` | HypeSquad Brilliance | ![Brilliance](images/brilliance.png) |
| `--balance` | HypeSquad Balance | ![Balance](images/balance.png) |
| `--remove` | バッジ削除 | ❌ |

---

## 🚀 クイックスタート

### Step 1 — 🔑 Discord トークンを取得する

1. ブラウザで [Discord](https://discord.com/channels/@me) を開く
2. `F12`（Mac: `Cmd + Option + I`）で **開発者ツール** を開く
3. 上部の **Network** タブをクリック
4. 適当なチャンネルで **メッセージを送信** する
5. 左側に `messages` というリクエストが出現 → クリック
6. 右側の **Headers** タブを開く
7. **Request Headers** の中から `Authorization` の値をコピー ✅

> ⚠️ **トークンは絶対に他人と共有しないでください。** アカウントへの完全なアクセス権を与えることになります。

### Step 2 — ⚡ コマンドを実行する

```bash
npx hypesquad --<バッジ名>
```

トークンの入力を求められるので、Step 1 でコピーした値を貼り付けます。

🔒 入力中のトークンは `****` でマスクされます。

### Step 3 — ✅ 完了！

プロフィールを確認して、バッジがついていれば成功です 🎉

---

## 📖 使用例

```bash
# 💜 Bravery に設定
npx hypesquad --bravery

# 🧡 Brilliance に設定
npx hypesquad --brilliance

# 💚 Balance に設定
npx hypesquad --balance

# ❌ バッジを外す
npx hypesquad --remove
```

---

## 🧪 ドライラン

実際にリクエストを送らず、送信内容だけ確認できます。

```bash
npx hypesquad --bravery --dry-run
```

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```
