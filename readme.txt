
## Apka do rozbudowy 60% kodu już jest.
baza, zarządzanie, wygląd.
Dodać ewentualne moduły rozszerzające


### Uruchamianie
Stwórz baze danych o nazwie: "mojabaza"

w folderze backend:
npm install

Stwórz pustą baze danych mysql o nazwie "mojabaza"
Ja mam użytkownika do mysql root z haslem lexus
Następnie zmodyfikuj plik .env poprawnymi danymi dostępowymi do bazy danych.
npx prisma migrate dev --name init
npm run dev

w folderze frontend:
npm install
npm run dev


### Główne założenia:
- Aplikacja fullstack z frontendem w React (Vite), backendem w Node.js + Express, bazą danych MySQL z wykorzystaniem Prisma ORM.
- Obsługa rejestracji, logowania (JWT), dodawania ofert, dopasowywania użytkowników, czatu w czasie rzeczywistym oraz panelu administratora.
- Kod powinien być zorganizowany w oddzielne foldery (frontend/backend), z zastosowaniem REST API, React Router, TailwindCSS.

### Funkcjonalności:
1. Rejestracja i logowanie użytkowników (JWT) /zrobione
2. Edytowalny profil użytkownika /tylko dodać frontend
3. Dodawanie ofert (umiejętność, lokalizacja, czego chcesz się nauczyć) /zrobione
4. System dopasowywania na podstawie ofert /tylko dodać frontend
5. Lista dopasowań z możliwością akceptacji /tylko dodać frontend
6. Komunikator czatu (WebSocket – socket.io) /nie wgłebiałem się
7. System oceniania po zakończonej wymianie /nie wgłebiałem się
8. Panel administratora (zarządzanie użytkownikami i ofertami)/nie wgłebiałem się
9. Prosty system powiadomień (np. toast) /nie wgłebiałem się


### Baza danych (MySQL):
- Tabele: Users, Skills, Offers, Matches, Messages, Reviews, Notifications
- ORM: Prisma
- Wszystkie relacje mają być zdefiniowane, np. 1:N user → offers, N:N skills ↔ offers
