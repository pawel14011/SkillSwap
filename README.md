
# 🔁 SkillSwap – Platforma wymiany umiejętności

**Status projektu:** w trakcie rozbudowy (około 60% ukończone)  
**Opis:** Aplikacja fullstack służąca do wymiany umiejętności między użytkownikami w modelu barterowym. Zawiera rejestrację, zarządzanie profilem, oferty, dopasowywanie oraz system czatu i ocen.

---

## 🚀 Uruchamianie projektu lokalnie

> Upewnij się, że masz zainstalowane: Node.js, MySQL, npm oraz `npx`.

### 1. Baza danych (MySQL)
- Utwórz **pustą bazę danych** o nazwie: `mojabaza`.
- Domyślnie w projekcie konfiguracja `.env` zakłada:
  ```env
  DB_USER=root
  DB_PASSWORD=lexus
  DB_NAME=mojabaza
  ```

> Zmodyfikuj te dane w pliku `.env` jeśli używasz innych poświadczeń.

---

### 2. Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Główne założenia

- **Frontend**: React (Vite), TailwindCSS, React Router
- **Backend**: Node.js + Express
- **Baza danych**: MySQL + Prisma ORM
- **Komunikacja**: REST API + WebSocket (socket.io)
- **Autoryzacja**: JWT

---

## ⚙️ Funkcjonalności (docelowe)

1. ✅ Rejestracja i logowanie użytkowników (JWT)  
2. ✅ Edytowalny profil użytkownika  
3. ✅ Dodawanie ofert (umiejętność, lokalizacja, czego chcesz się nauczyć)  
4. 🔄 System dopasowywania na podstawie ofert  
5. 🔄 Lista dopasowań z możliwością akceptacji  
6. 🔄 Komunikator czatu (WebSocket – socket.io)  
7. 🔄 System oceniania po zakończonej wymianie  
8. 🔄 Panel administratora (zarządzanie użytkownikami i ofertami)  
9. 🔄 System powiadomień (np. toast)

> Moduły 4–9 są w trakcie implementacji lub w planach rozwojowych.

---

## 🧩 Struktura bazy danych

| Tabela        | Opis                                      |
|---------------|-------------------------------------------|
| `Users`       | Dane logowania i profilowe użytkownika    |
| `Skills`      | Umiejętności przypisane do ofert           |
| `Offers`      | Oferty użytkowników                       |
| `Matches`     | Powiązania między ofertami                |
| `Messages`    | Wiadomości w czacie                       |
| `Reviews`     | Oceny i opinie użytkowników               |
| `Notifications` | System powiadomień                      |

ORM: **Prisma** – zdefiniowane relacje i migracje.

---

## 📌 Uwagi

- Projekt jest tworzony przez 3-osobowy zespół w ramach praktyk zawodowych.
- Kod wymaga jeszcze dopracowania i rozszerzenia o funkcje czatu, ocen i administracji.
- Pull requesty i propozycje mile widziane!

---

## 🧠 Do zrobienia

- [ ] Dopasowywanie ofert
- [ ] Czat real-time
- [ ] Panel admina
- [ ] System ocen i powiadomień
- [ ] Finalny deploy i testy E2E

---

![Zrzut ekranu aplikacji]([https://i.imgur.com/nazwaTwojegoObrazka.png](https://lh3.google.com/u/0/d/152nzkg3-HYUIIoA2pQ-a…TPuSzYNu1=w1920-h1031-iv1?auditContext=forDisplay))



## 📄 Licencja

Projekt edukacyjny – open source, bez ograniczeń licencyjnych.
