# Progetto di Giada Rossana Margarone
#### Matricola: 1000015029
#### Corso: WEB PROGRAMMING, DESIGN & USABILITY

## Descrizione del Progetto
Questo applicativo web è stato sviluppato come parte del corso di Web Programming, Design & Usability. L'applicativo permette la gestione di eventi e utenti, utilizzando una combinazione di tecnologie moderne per il frontend e il backend.

## Tecnologie Utilizzate
- React: Framework JavaScript;
- Bootstrap: Libreria CSS per un design responsive;
- MongoDB: Database NoSQL per la gestione dei dati;
- Google API: Utilizzato per l'integrazione con Google Maps e altre funzionalità.

## Prerequisiti
Prima di poter avviare il progetto, bisogna assicurarsi di avere:

1. MongoDB: Un'istanza di MongoDB attiva e configurata.
2. Google API Keys: Chiavi API di Google per utilizzare Google Maps e altre funzionalità.
3. Node.js e npm: Assicurati di avere Node.js e npm installati.

## Configurazione

1. Configurazione del Backend
Crea un file .env nella cartella ./progetto/server/ con i seguenti parametri:

`PORT=porta_di_ascolto_del_server (es. 5000)`

`JWT_SECRET=tuo_segreto_per_jwt`

`MONGODB_URI=indirizzo_della_tua_istanza_mongodb`

2. Configurazione del Frontend
Crea un file .env nella cartella ./progetto/client/ con i seguenti parametri:

`REACT_APP_GOOGLE_MAPS_API_KEY=la_tua_chiave_google_maps`
`REACT_APP_MAP_ID=id_della_mappa_google`

3. Installazione delle Dipendenze
Naviga nelle cartelle del client e del server e installa le dipendenze necessarie con i seguenti comandi:

`cd ./progetto/client`
`npm install`

Installazione delle Dipendenze del Server
`cd ../server`
`npm install`

## Avvio del Progetto

1. Avvio del Backend
Dalla cartella ./progetto/server, avvia il server con il comando:

`npm start`

Il server partirà sulla porta specificata nel file .env.

2. Avvio del Frontend
Dalla cartella ./progetto/client, avvia l'app React con il comando:

`npm start`

L'app sarà accessibile all'indirizzo http://localhost:3000.


