# 🏠 hypesquad-collector

> 🚫 UI에서 사라진 Discord HypeSquad 배지를 명령어 하나로 설정·삭제하는 CLI 도구

🌐 [日本語](../README.md) | [English](README.en.md) | [中文](README.zh.md) | **한국어** | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

---

## 🎖️ 지원 배지

| 플래그 | House | 배지 |
|---|---|:---:|
| `--bravery` | HypeSquad Bravery | ![Bravery](../images/bravery.png) |
| `--brilliance` | HypeSquad Brilliance | ![Brilliance](../images/brilliance.png) |
| `--balance` | HypeSquad Balance | ![Balance](../images/balance.png) |
| `--remove` | 배지 삭제 | ❌ |

---

## 🚀 빠른 시작

### Step 1 — 🔑 Discord 토큰 가져오기

1. 브라우저에서 [Discord](https://discord.com/channels/@me)를 열기
2. `F12` (Mac: `Cmd + Option + I`)를 눌러 **개발자 도구** 열기
3. 상단의 **Network** 탭 클릭
4. 아무 채널에서 **메시지를 전송**
5. 왼쪽에 `messages` 요청이 나타남 → 클릭
6. 오른쪽의 **Headers** 탭 열기
7. **Request Headers**에서 `Authorization` 값을 복사 ✅

> ⚠️ **토큰을 절대 다른 사람과 공유하지 마세요.** 계정에 대한 전체 액세스 권한을 부여하게 됩니다.

### Step 2 — ⚡ 명령어 실행

```bash
npx hypesquad --<배지명>
```

토큰 입력을 요청받으면 Step 1에서 복사한 값을 붙여넣으세요.

🔒 입력 중 토큰은 `****`로 마스킹됩니다.

### Step 3 — ✅ 완료!

프로필을 확인하여 배지가 표시되면 성공입니다 🎉

---

## 📖 사용 예시

```bash
# 💜 Bravery로 설정
npx hypesquad --bravery

# 🧡 Brilliance로 설정
npx hypesquad --brilliance

# 💚 Balance로 설정
npx hypesquad --balance

# ❌ 배지 삭제
npx hypesquad --remove
```

---

## 🧪 드라이 런

실제 요청을 보내지 않고 전송 내용만 미리 확인합니다.

```bash
npx hypesquad --bravery --dry-run
```

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```
