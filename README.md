
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

<img src="https://lh3.googleusercontent.com/fife/ALs6j_Hm8Uf4aKVSannEwI5x2Abwsm7Q3pWkaNTHngA5lKqHW6HXcw6dBAKZEM_7OphJxBWK9KKshVjJs3O3DmzRlbszKSnGoUYu6l8Q0VUIsPImU3PKrmKIhbQRZKpSg1XhooiMVVlJklTtB5xKlsxX2mbqQDBosVk7tifRbA8b7uBF1eEal-6pwO9SPkRceaqTyQw93GDD_Ytve2tAO4JLXHf_ds8E7-9UoAPajaUf01R_IUgA0PFU4aTiVeyLlirk3ZjUU3iGlkg2puHKDhkzgobVMJaRVyM3K-R9JXTQJ0FNOBc85KiQRgAvD2RnFFjx4l8iDoeyHxn-phJUSG0EjIQkBS3qoMXbOIOv4uneVNMhhlSZywe8Ci6coJKYR825Acm6BQ2Ym6yadD83tQ3dn42v4it5yYye5FGFLq2WGcZHZTCFW38G0Qo9CrLzsaN_1V6MqypG7aebaRV-wjM_1eODvf4ku5xTRvX5FqW6KWrjgHOnTtmesmhhbfFqeycKhL-ZmYc0MOr10aRddRaUV1LMi_qW6RfAUZ9pWQ-nng_Vn4uDxV9ctJsSUDx8KIWf2UHV2COVlldWiEf81bPawIciAwIjDMDj32rHdvBZeCh-nHj_oBT7mPD7zh0Dfq5uSCwwqpqzxGl-ukwIXuKYeCxHVbPx9axUfh7u7KJsYR3IvEYeW36agpL0aaneaqQGLkOpl7nwoZc63enDmhSA24tDG89BYFOUyziuzJnhwq1YVpi3w2a6Jp1wp-iGXWEgpEOC-wtIordwPrnHque4y8JqlA4VI3P-ooiXkgKo2UtpouoQl9OIeLg1y8IboV253rcPwcoA96q3nKBZdCp9NH5GLrlmS-Oie9Ygx5Yc-wauPJWikbH7VDQfjF6djlrkjNWOGA2PsgnK-eS2dqVscSXVNYjN8qrPdeNgZK8_9D0bF-5ly0i658-c2fAzTVBSoxZXCkba5sO6fB9WEuHU_03GF9_sBzJi6y2fyTUBJhlkKDM8k7TzppVk6MafgrYt_LBMLGUSGHXNdAEPKfYFhE2AC-kGqyi0LQTUx5mMHLVhR_coH8JVuD-ew9AFezFSmynvszTZBNY-RoNCbOYN5oBSvEEhDVdBKQ7ePHZXBV8hIHvZyzdHhE7W9qMq3ugt2ZF4LR2-tswfY2aK9KPOeO7-km3njPASZqWoTJXhQQq_0Idkwanas9s322BIzjp_Gzk-ieLsrReDN1fZ6UUcdfqXzagIo3VD7k2deKQMzzZ-fyoCUo7hxODgsmqWdJnglXKXxXrFhCJImsfVegBCRH91-VC6cmCMrLOaMuanLxv_ubLvknT6BBipw7ZapiSdOZM_Nae16EJsLXJ7SuGxoafAcMmnQSPtbeN582Ft2gfLJNG7V5OxW_mQ68f382zOXareOWXBRdo5Bay2dwSWPlk4xbwkR4pU8Yk0Wtpu7mEfge_E3CDqr7PO16yc80y-IZ9xmFaDf8pzJNrYCGeFwLmhKUStSkxA-lkrf_QMelkzZGXDadenR4L7HtvocjwMyEDnFMA4xMJAZQKNOP_nsR2yZJ1sZi384-eIWX3Qnwf-A7Eh1O0dnmwsgUSintz2B3UU2TM4aPSNLpiiEZUmTbtUWIldpFHQ6GNiH2Q4xYJvRr8DdIDgy1OrCg3XENmIMD7HCipg3gsysC6N_chxG9LR2xgUYodUaAQfVoeD8A3s3i8bLi6S8Fp0f-59Sl8HqYmLuNJfuHc7Gszcc0zt=w835-h1015?auditContext=forDisplay" width="800px" alt="Logowanie"/>


<img src="https://lh3.googleusercontent.com/fife/ALs6j_ENp272-Wq7cn-3TdUQ3BM9G9yOvvf5fQKR2nyNZwop54ssGgkzq2ZmZ5FKyuE1_lebXvSvXFXdlo-MtxUjbF41K7BltIw75A2eQ_PIzwfeQV5QpV-FI6pFGoYh_HYjBq-ABN9MuiyvbirLaMl4Ps5jsWUSL3LI0p9-He1QmixT7kiUkqE6QmpcnkE_sxOcnSoFZifZpzDouTfaTb46872foYcYeCBFaM37y4Gcd9U9bGkKUwdDfwkc18CRAOBa6bJMwiGqFIXXdOkAX-EgAfL5dYRP_iWRkDnX3-5ugtfSbbH1IZKyd1M8r5S1eHcgTraj_-JryBNF9WY1sv-8cAVaau5NeVigpB09j5GsWclj1KFrqO8yTSkzrjhHRsmJ1PiTt7KBcb_IiTcQbZKRflofWDEAB9c0qB8SoiITMKB1toD5un38EaKLPInNp4bQ8P5MLhov299ZbFis17enS3LS07f9xR5QBVlQrTQBZGccAYHpOmsqErqXzQEgW3OC98_2vfgvvmJMnV2pEtXm90YuTnzsX6Wg9ZAw1HCPM1uGxA_wczP0egqQzr0TBFE6uZocfgCw5B2gT_Qh5Re8_B_0WbvdBzcgEqkgSyfzO7k_tGniI9Zc2mekJKwt5peAADRixIAnDi2lQg7R-0xILrDHEc3XNlEUXaKt0Ns_ul2Xid1h7yOCdmUJKJbvVSIWsN9EGlTfgnznI2NZQw6wvkQZt1qZOVwNY_ubIuEEZKzPtwqMtmbeaIAMYIhyw_e0C1kXBh3ogtdEJdBHV0pu9D24EdvQFqkuhGBmxDY66JPXWgcnZHymKQm7WcuEcCC3NbjR7rDPfP3Bi6NrQTSnscJ6Eykp5Ag4tf8tgdWr69KD4c6cbNbr_DFYNqzuqEFtpsKnVPBBhRPfdk4Zv987insX8IoarDhj8uHd1aCIdGY6Ej3AZ3bBaGgakLKShhojF0KJnZtAyS4AUTKdDA6agJ134TJnJF49Twy0v0LZP_qIFx9mhEqoABTidYppAU8QWqnTHtxjKT4ruyrCRRgBcnzZVGsw94J_cfyQ13ghXKC41FJXVu2NSVDJimdhrkJJ3LZdSNtOGsjCVXImDmYlGjegH754sdr6nywpp8eKo535hMg2y93629YrsMZGqM3Qq0-5KcsOvn_3Jy-2r7E_VRHr9Z09i-x8m86Lvg_nxjPxz8n3iZQSztiM6nnlcZWPxc6TKmur1zjtHZ7fDsde7ClU5aNaqWTEK5FEuXEFuCpMzAST8Zven_9_521S8TaoVzvhQ7UEnHrby3-HM_0OfBnZaUXIiCu2xTJ89pkrFLaF0cL2nHiRrQtUuq5yrSe6VGu8rN-c0Ingd0VbDj2QBOCcqjYlH08BqBnWeW65i3_1vAZLO2GXzbujnxJWZ02skJFyiUSjN6BXli3qChhFj33XJqbOOZtReZw9-4_YatvsI0ReCGh2biXa59FPIoR3OTmHAWek4zeynRJ1SzsD6-iFbETnS4nheaVsfSZp1mLsqDaEfPC1US-Hu3-GKMiXCFC7-r9TCvjqaxaUI3UOsV0KYfTgqV2r24nYruku4bps8Ct36blLEmsDI5Urb_jPhAJTKANfslrt2DlMoZZIBp57deURrKGredo8wPULo5g0Ja-KcviJLlHBkPANxU88kNtBIDM8M_uno5kf46ftf0enxEXhQqPaLydqFGiwn0AIdqsFu5fhKtEopo0NGEpXNAEz1gMF_ig7rxaqudP3IQ=w1920-h1031?auditContext=forDisplay" width="800px" alt="Profil"/>


<img src="https://lh3.googleusercontent.com/fife/ALs6j_FfzF-gQOq_9TsipYgyF1eLUiT9IOoPh6BMqRgxQnR7vyene9hN0OQold4vITmUSST7bWyoOKgIHi4EErjbiGBDc-dbPeprrXs0vZjoWXaifBAulQnFfJhjYiusJ5CnSelLW9hqN4Okt4KcUAt8d_syDX1H9fqTYV8ucf40vHJwBfMJ4RJxlCkcs__VnUcm7nh4ziz3tFlduA2voPUwRx42ysd8dyF3J6uutVwXKSbt96gk0ypz0mJEf6bBjD5bXVaS6XiJ0NckBtJdnaku3H0M9UAFaGRqoJEsjPXMCdAQt04GH-18ko6HbED8IIboroqFsNw5j79108okFOll7TbyZE4MkIVJL0ihu3x44IohCusJrWMlZw7gkJ2_qC9ZuLaokM7Vva-L4DJZZdqnkuH-2qV3ufwyFqXUaJC_Hl2W2EynS43D67jeSllpw9_ZQ73q4aNNi9OmgUiZgA3AEZCeppAW4zTgffgqd7KgA5o2dI0QXmM1GpEq0ipVoaB5ZIRopMm8bjgAZn9nA0nQGXnV-nhG6TQNgRUeUFWVvWD4CoZ6aE06OiZFMURlaJgpdJ1LitlfQht4iC834gr1-9MqZjYkiA36zLdbDYe8rg-j8I-XJ0Zy_EG3BHHRL1n1iuQpYkup02fT1ieRhE_7vWJ2NeRt-IxIk3kFFos5YHMt6LKI4dwAuyiumFzwDLhhkiEF29oGs3_SbvakK2fFW--AL4cTWzZymwXez9p74TQL3BPY6fCP_W5v_0XmPFT2LNkVU_-PSpyPe6AGviBm4159LgQWt6ebgGu51NcXwgY7CvCk2sUzgXErWth5ROCXuyp6KTtMxzK_mTu-Gup3__TfZ2FGus0iTOZO2rwdFFo8vnnA7YDdGuxvMBLenc4eDO4rFQE1FfBIZRPRNbOBYDHR-yKwiuXmzLgVea33-Pc-7CFtWAUdDvAF5M6JI_ofb3J_PhIZq-1OYdh66aTOCRSmttTqX5LFT-BdPBMUz0xJeoIjh8njlDOKSE1fXxA3K_QwogcJKxjGXl1jgeHrNJJf5X48TNIEVxuIup5Cpw4hMz5xaPUjZf21X_4QugPHsiTZR1mkw6u9WAIRAbgI8kiSexQ0Xc3KoLRzPgoWTfOmdSYhmADNZj1BaWZisueQcYlozrDN5LovYflT_uYH_lidme3DRWos1adSaJQ29gFgBsXCLU6CU6IwDsqGOK3S0TeXwK9ykr3-djraWQushQo1B7ff-hPtXNAuIyAij-j0GSVgwBrS0bRL0K_FKeQhut--L1Jlfs6jEAzsNPXawraUVWern90o_NXRjgGKGgdV_vF0CfqVwv27CsopZ2nt5CubkPF8274BmDoT-7KZPWXIoMayTe831vHcnQNjB9vdAskQfOgAApeM9m23npKv90fx0raUdSy5E0KjoSjTwGwLeGG1IbF2_4k2GxOFuyfV85O1JaopkUrKIdWCEpp30oiZgixghMQJzoryudBlu2vI1_3WFprUBZpwHlBzgMgToj6PgtnmyB9WlqUeavXowF0OC7_nRmXHBnfKS_qN6gS4dwnRhNi8Me9ouKan7kUHNnITlkOyi9vssmZ47HzjFNuFr4ZlkDzQCuGYoitUQlf45hWBiVF9UAa7gV5gYj_5_r5eGdLxPvCJJ_p44M2CO699EPnZX3Dx5kRQUFUWIkOFufwM7D3HyWyfVPlHCnbhPt16UULlYHu1nC1YEEYBcszz1ccZFReP2AH3yfSgEA=w835-h1015?auditContext=prefetch" width="800px" alt="Oferta"/>






<img src="https://lh3.googleusercontent.com/fife/ALs6j_EVrMiTPLQEdH6zYOdpgnMDBU_Tgmb4z6H_BWWnrqx7-wUDVAOuNygHnJlWW1tpBFSV8RGj95y9xOdaJG8rSkO5_TZfbZdsb8JZMjExUvElP17ilNj0wSYG4Gzy2XxvBr-gFe50IMrzmjOI3skMOGJu-2TCnfcCKd0-deNrP-sAQzty1NvA0Hv2noibRFPDIzx9DXghn23wBu7gT5IZQIgd-CdbzoKGbYGYuH_QRgLnybM-nY-hcicyuPIgHsOhCMT_fTqO8fJutQreWPIFG6QjXpkpzHXVnUBxmWKjfHi_8PuYqgC-xA9H657J9SDEOBtn4ODemYncIIn7J6op96pDjLs95aCTfYgkaVCISL-uA3dF6Tt5ZrkUETQe6lFM5e-Lco3pqFNq7ItlN7pfAIM7GmUo44ayYOGTYTxKkyw-TER5hN64uvwgoIWQk6fjiqL88vo1z93g17k7K1H147m6FXudfGCeVcElnZ_pi7oMfbFBTMiMI7H2RBV-QMXP0nw7anHSiDtgNb9FK1G2_AzIS41AvXdM7TH9Z2Pu1QCOPWCaq---GF3LxX5HH6pbq43hmNgifi_dRQcLzkEB1C7sNqOvbrdBeb1N-HS3m1k1cuBeNLoqefhVCQ8Mgxqur6LdKDVE7iQ1UOK3qj0zLdj9IVLfuuy18nTAdLFj6APsdM9bf5gM0DFoOorVTWc0JZo1IjQrpWrJMJJD52q9TnAEuFizBPuZNafVWp5yul9MY7R3OZPTVILVd0q9Ud7HWu5TsZMW-g8qTpK-bwot4vmnnQQXhZxwVx9aGE4zAx3YRCiH5LSUZ_-iF-9HgyYlVIzlDJdAHT4ibYmCgCUxQ-NxGSfJfDxVlZu_0VzRTvLom2zIsu0-OZ6C0xsNNJ53AZsbGxpL-1p-KPDHC1E27OU796FHSHv9Sq-1Z1cqMPVKajFjOLDsB-1U9oYhnIdhMFM_vR-DkaIDfBub4zKWY03aDRkrm48tYTZ19vBZWzriBr8STNST18D8XsN7ndDQ6_czgu7EQ4GoPLvL6GE21lm7vKVjwAdMnm9UOpr2W2xflRI8OluJjMFWYhszg6h2v730yn5XTmUEFLevrtNEFpPkTLvWcP82Gqtpu0qXkF9P0fgqIBz6d7EJUTpjywGqPZxa0c0eXN_s3gLUuXBDENqf8kMLm-70_chWN0Et_6fp2yuMGMjM1mdxyaES1nQvXljd8-63TBkHk0n4gg-_m5qsjk6XwqM6sCxHxMKO7SiYaWaqn1yZwVrCmRUJgSIQUkgnYRk1NTKcMIjyk4xRgyfNavOk59KqDRJm7d-Q-jaXb-GmeSW54izKd_0l4q9zLSh04Qeul3v4tg8v-X8vWYt5WL2ypBBAKfYCnkHiQIZLZ55jPfw9xSlvumzzQysK8nqKf0-i32Uh9IlXkUxGIuO779SkBTTYgYCaCSjPulk438XcOihtWGWGUsJrbz-uQjfkwnV8GHyf-QIEHkZiROrazUupx1K3f7coJkB25CSI0ouY0sqb-rqGK2EeHT2EBP-RbIPNx4wW8-OokInyYtwSmodJ22Q_q2McMMcpv_ZpffvapyOOVaIwc5arEeS50AOEtcySdFqhsaMLIUc1rzAadKKkpDsSKXdU8oyUV3fXDjoWHD5K-g0LG_nt3MlhUXiNgyBU_Onkk-jDSE7oOlDpNz71clv9yLB9GaqQh4h8neTDE6_WJOOwmSKqtwbaq2iq6_ucMSUV77-YGqP1=w1920-h1031?auditContext=forDisplay" width="800px" alt="Wygląd"/>



## 📄 Licencja

Projekt edukacyjny – open source, bez ograniczeń licencyjnych.
