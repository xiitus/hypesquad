# 🏠 hypesquad-collector

> 🚫 UI에서 사라진 Discord HypeSquad 배지를 명령어 하나로 설정하거나 제거하는 도구

🌐 [日本語](../README.md) | [English](README.en.md) | [中文](README.zh.md) | **한국어** | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

---

## ⚡ 실행 명령어
| 배지 | 하고 싶은 것 | 명령어 |
|---|---|---|
| ![Bravery](../images/bravery.png) | 💜 Bravery로 설정 | `npx hypesquad --bravery` |
| ![Brilliance](../images/brilliance.png) | 🧡 Brilliance로 설정 | `npx hypesquad --brilliance` |
| ![Balance](../images/balance.png) | 💚 Balance로 설정 | `npx hypesquad --balance` |
| ❌ | ❌ 배지 제거 | `npx hypesquad --remove` |
| 👀 | 먼저 미리보기만 보기 | `npx hypesquad --bravery --dry-run` |

실행하면 `Discord token:` 이 표시됩니다. 토큰을 붙여넣고 Enter를 누르세요.

토큰을 어떻게 보는지 모르겠다면 아래 [🔑 TOKEN 확인 방법](#-token-확인-방법)을 확인하세요.

`--dry-run` 을 붙이면 실제로 배지를 바꾸지 않고 요청 내용만 확인할 수 있습니다.

---

## 🔑 TOKEN 확인 방법

토큰은 Discord 계정을 식별하는 긴 문자열입니다. 아래 순서대로 복사하세요.

1. **브라우저**(Chrome, Brave, Edge 등)에서 [Discord](https://discord.com/channels/@me)를 엽니다
   - ⚠️ 데스크톱 앱이 아니라 **브라우저 버전**을 사용하세요
2. **개발자 도구**를 엽니다
   - Windows: `F12`
   - Mac: `Cmd + Option + I`
3. **Network** 탭을 엽니다
   - 보이지 않으면 `>>` 를 눌러 숨겨진 탭을 펼치세요
4. Discord로 돌아가 아무 채널에 메시지를 하나 보냅니다
   - `hi` 나 `test` 정도면 충분합니다
5. 왼쪽 목록에서 **`messages`** 요청을 클릭합니다
6. **Headers** 탭을 엽니다
7. **Request Headers** 섹션을 찾습니다
8. **`Authorization`** 항목을 찾아 오른쪽 긴 문자열을 우클릭 후 복사합니다 ✅

> ⚠️ 이 토큰은 비밀번호처럼 다뤄야 합니다. 다른 사람과 공유하지 마세요.

---

## ❓ 문제 해결
<details>
<summary>열기</summary>

### "npx not found" 가 나와요

→ 같은 명령어를 한 번 더 실행해 보세요. 환경에 따라 Node.js 준비에 시간이 조금 걸릴 수 있습니다.

### "brew not found" 가 나와요

→ macOS에서는 Homebrew로 Node.js를 자동 설치합니다. 자동 설치가 실패하면 [Homebrew 사이트](https://brew.sh/) 또는 [Node.js 공식 사이트](https://nodejs.org/ko)에서 먼저 설치하세요.

### TOKEN을 어떻게 보는지 모르겠어요

→ 위의 [🔑 TOKEN 확인 방법](#-token-확인-방법)을 확인하세요.

### "Failed (401)" 이 나와요

→ 토큰이 잘못되었거나 만료되었습니다. 위 단계대로 다시 가져오세요.

### "Failed (429)" 이 나와요

→ 짧은 시간에 요청을 너무 많이 보냈습니다. 몇 분 뒤 다시 시도하세요.

### 배지가 바뀌지 않아요

→ Discord를 완전히 닫았다가 다시 열어 보세요. 반영까지 잠깐 걸릴 수 있습니다.
</details>
