🎬 ITSCinemaX 
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-API-01b4e4?style=for-the-badge&logo=themoviedatabase&logoColor=white)

**ITSCinemaX** è un'applicazione web Single Page Application (SPA) sviluppata in **Angular 19** che permette agli utenti di fare cose belle. Il progetto utilizza l'API di **TheMovieDB** per i dati e un player esterno per la riproduzione dell cose.

---

## ✨ Funzionalità Principali

* **🏠 Home Page Dinamica:** Visualizzazione dei film più popolari, con caricamento automatico all'avvio.
* **🔍 Ricerca Avanzata:** Barra di ricerca per trovare film per titolo.
* **📂 Filtri Combinati:** Possibilità di filtrare contemporaneamente per **Anno** (dal 2025 al 1995) e per **Genere**.
* **📄 Paginazione Custom:** Sistema di paginazione numerata dinamica (1, 2, 3...) sia in testa che in coda alla pagina.
* **🎥 Streaming Player:** Integrazione di un player video tramite `iframe` sanificato per la visione diretta delle cose.
* **📱 Design Responsivo:** Interfaccia **Dark Mode** "Netflix-style" realizzata interamente in **CSS Nativo** (senza framework esterni come Bootstrap), ottimizzata per Desktop e Mobile.
* **⏳ UX Ottimizzata:** Feedback visivi di caricamento (Spinner) per gestire i tempi di risposta delle API.

---

## 🛠️ Stack Tecnologico

Il progetto è stato realizzato seguendo le best practices più recenti di Angular:

* **Framework:** Angular 19 (Ultima versione).
* **Architettura:** Standalone Components (No NgModules).
* **Control Flow:** Utilizzo della nuova sintassi `@if`, `@for` per template più performanti e leggibili.
* **Data Fetching:** `HttpClient` per le chiamate REST verso TMDB.
* **State Management:** Gestione manuale reattiva tramite Service Pattern.
* **Security:** Utilizzo di `DomSanitizer` per l'integrazione sicura di iframe esterni.
* **Change Detection:** Utilizzo di `ChangeDetectorRef` per gestire l'aggiornamento della UI in contesti asincroni complessi.

---

## 🚀 Installazione e Avvio

Per provare il progetto in locale:

1.  **Clona la repository:**
    ```bash
    git clone [https://github.com/ILTUONOME/ITSCinemaX.git](https://github.com/ILTUONOME/ITSCinemaX.git)
    cd ITSCinemaX
    ```

2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```

3.  **Avvia il server di sviluppo:**
    ```bash
    ng serve
    ```

4.  Apri il browser all'indirizzo `http://localhost:4200`.

---

## 📂 Struttura del Progetto

```text
src/
├── app/
│   ├── components/
│   │   ├── home/           # Logica principale, filtri e griglia
│   │   ├── movie-card/     # Componente riutilizzabile per il singolo film
│   │   ├── movie-detail/   # Pagina dettaglio con Player e Info
│   │   └── navbar/         # Barra di navigazione con Logo
│   ├── interfaces/         # Definizioni TypeScript (Movie, Genre)
│   ├── services/           # Servizio centralizzato per le chiamate API
│   ├── app.routes.ts       # Configurazione del Routing
│   └── app.config.ts       # Configurazione globale (HttpClient provider)
├── assets/                 # Immagini statiche (Logo, Placeholder)
└── environments/           # Chiavi API (TMDB Token)
