# 🏠 hypesquad-collector

> 🚫 Установка и удаление значков Discord HypeSquad, исчезнувших из интерфейса — одной командой

🌐 [日本語](../README.md) | [English](README.en.md) | [中文](README.zh.md) | [한국어](README.ko.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | **Русский**

---

## 🎖️ Поддерживаемые значки

| Флаг | House | Значок |
|---|---|:---:|
| `--bravery` | HypeSquad Bravery | ![Bravery](../images/bravery.png) |
| `--brilliance` | HypeSquad Brilliance | ![Brilliance](../images/brilliance.png) |
| `--balance` | HypeSquad Balance | ![Balance](../images/balance.png) |
| `--remove` | Удалить значок | ❌ |

---

## 🚀 Быстрый старт

### Шаг 1 — 🔑 Получите токен Discord

1. Откройте [Discord](https://discord.com/channels/@me) в браузере
2. Нажмите `F12` (Mac: `Cmd + Option + I`), чтобы открыть **инструменты разработчика**
3. Нажмите на вкладку **Network** вверху
4. **Отправьте сообщение** в любом канале
5. Слева появится запрос `messages` → нажмите на него
6. Откройте вкладку **Headers** справа
7. Скопируйте значение `Authorization` из **Request Headers** ✅

> ⚠️ **Никогда не передавайте свой токен другим.** Он даёт полный доступ к вашему аккаунту.

### Шаг 2 — ⚡ Выполните команду

```bash
npx hypesquad --<название-значка>
```

Вам будет предложено ввести токен. Вставьте значение из шага 1.

🔒 Токен маскируется символами `****` при вводе.

### Шаг 3 — ✅ Готово!

Проверьте профиль — если значок отображается, всё получилось 🎉

---

## 📖 Примеры

```bash
# 💜 Установить Bravery
npx hypesquad --bravery

# 🧡 Установить Brilliance
npx hypesquad --brilliance

# 💚 Установить Balance
npx hypesquad --balance

# ❌ Удалить значок
npx hypesquad --remove
```

---

## 🧪 Пробный запуск

Предварительный просмотр запроса без фактической отправки.

```bash
npx hypesquad --bravery --dry-run
```

```
[DRY RUN] POST https://discord.com/api/v9/hypesquad/online
  Action: bravery
  Token: abcd****************************
  Body: {"house_id":1}
```
