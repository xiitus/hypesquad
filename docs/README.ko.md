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

## 📋 사전 준비

이 도구를 사용하려면 **Node.js**가 필요합니다. 아직 설치하지 않았다면 먼저 설치해 주세요.

### 🍎 Mac

1. **터미널**을 열기
   - `Cmd + Space`를 눌러 "터미널"을 입력 → Enter
2. 아래 명령어를 붙여넣고 Enter:

```bash
brew install node
```

> 💡 `brew`가 없으면 [Node.js 공식 사이트](https://nodejs.org/ko)에서 설치 파일을 다운로드하세요.

### 🪟 Windows

1. [Node.js 공식 사이트](https://nodejs.org/ko)에 접속
2. **녹색 「LTS」 버튼**을 클릭하여 다운로드
3. 다운로드한 파일을 열고 안내에 따라 설치
4. 설치 완료 후 PC를 **재시작**

### ✅ 설치 확인

터미널(Windows는 **PowerShell**)을 열고 실행:

```bash
node -v
```

`v20.xx.x` 같은 버전이 표시되면 준비 완료 👍

---

## 🚀 사용 방법 (3단계)

### Step 1 — 🔑 Discord 토큰 가져오기

"토큰"이란 Discord 계정을 식별하는 긴 문자열입니다. 아래 순서대로 복사하세요.

1. **브라우저**(Chrome, Brave, Edge 등)에서 [Discord](https://discord.com/channels/@me)를 열기
   - ⚠️ 데스크톱 앱이 아닌 **브라우저 버전**을 사용하세요

2. **개발자 도구** 열기
   - Windows: `F12` 키
   - Mac: `Cmd + Option + I` (세 키 동시)

3. 오른쪽(또는 아래쪽)에 패널이 나타남 → 상단의 **「Network」** 탭 클릭
   - 찾을 수 없으면 `>>`를 클릭하여 숨겨진 탭 표시

4. Discord로 돌아가 아무 채널에서 **메시지를 전송**
   - "안녕" 이나 "test" 등 아무거나 OK

5. 개발자 도구 왼쪽에 **`messages`** 요청이 표시됨 → **클릭**

6. 오른쪽에 상세 정보가 표시됨 → **「Headers」** 탭 클릭

7. 아래로 스크롤하여 **「Request Headers」** 섹션 찾기

8. **`Authorization`** 항목을 찾아 옆의 긴 문자열을 **우클릭 → 복사** ✅

> ⚠️ **이 문자열(토큰)을 절대로 다른 사람과 공유하지 마세요!**
> 토큰이 있으면 누구든 당신의 계정을 완전히 제어할 수 있습니다.
> 비밀번호만큼 소중하게 다루세요 🔐

---

### Step 2 — ⚡ 명령어 실행

터미널(Windows는 PowerShell)을 열고 아래를 붙여넣은 후 Enter:

```bash
npx hypesquad --bravery
```

> 💡 `--bravery` 부분을 `--brilliance`나 `--balance`로 바꾸면 다른 House가 됩니다.

이런 메시지가 나타납니다:

```
Discord token:
```

Step 1에서 복사한 토큰을 **붙여넣기**하고 Enter를 누르세요.

- Windows: `Ctrl + V`로 붙여넣기
- Mac: `Cmd + V`로 붙여넣기

🔒 입력 중에는 화면에 `****`로 표시됩니다 (보안을 위해 실제 내용은 보이지 않습니다).

`Done: Set to bravery (204)`가 표시되면 성공 🎉

---

### Step 3 — ✅ 배지 확인

1. Discord에서 자신의 아이콘 클릭 → **프로필** 열기
2. HypeSquad 배지가 표시되면 완료! 🥳

---

## 📖 명령어 목록

| 하고 싶은 것 | 명령어 |
|---|---|
| 💜 Bravery로 설정 | `npx hypesquad --bravery` |
| 🧡 Brilliance로 설정 | `npx hypesquad --brilliance` |
| 💚 Balance로 설정 | `npx hypesquad --balance` |
| ❌ 배지 삭제 | `npx hypesquad --remove` |

> 💡 pnpm이나 bun을 사용하는 경우:
> ```bash
> pnpm dlx hypesquad --bravery
> bunx hypesquad --bravery
> ```

---

## 🧪 드라이 런 (미리보기 모드)

실제로 배지를 변경하지 않고 "이런 요청을 보낼 거야"라는 미리보기만 봅니다. 처음이라 불안하다면 먼저 이걸 시도하세요:

```bash
npx hypesquad --bravery --dry-run
```

출력:

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```

문제없으면 `--dry-run`을 빼고 실행하세요 👍

---

## ❓ 자주 묻는 질문

### "npx를 찾을 수 없습니다"라고 나와요

→ Node.js가 설치되어 있지 않습니다. [📋 사전 준비](#-사전-준비)를 확인하세요.

### "Failed (401)"이 나와요

→ 토큰이 잘못되었거나 만료되었습니다. Step 1부터 다시 하세요.

### "Failed (429)"이 나와요

→ 짧은 시간에 요청을 너무 많이 보냈습니다. 몇 분 기다린 후 다시 시도하세요.

### 배지가 바뀌지 않아요

→ Discord를 닫았다가 다시 열면 반영될 수 있습니다.
