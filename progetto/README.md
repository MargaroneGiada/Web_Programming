Progetto di Giada Rossana Margarone, matricola 1000015029.
Corso: WEB PROGRAMMING, DESIGN & USABILITY

Per creare questo applicativo ho utilizzato i seguenti strumenti:
-React
-Bootstrap
-MongoDB
-Google API

Per poter utilizzare il progetto, bisogna avere un'istanza di MongoDB attiva e sostituirne l'indirizzo in ./progetto/server/main.js.
Bisogna essere in possesso (o richiedere) delle chiavi API di Google da inserire in un file (nuovo) ./progetto/client/.env come:
`REACT_APP_KEY=chiave
REACT_APP_MAP_ID=id`

Bisogna inolytre creare un file (nuovo) ./progetto/server/.env con i seguenti parametri:
`PORT=porta
JWT_SECRET=segreto
MONGO_URI=indirizzo_mongo`

Inoltre, bisogna aver installato sul proprio dispositivo npm.

Date queste premesse, i seguenti passaggi serviranno ad avviare client e server.
`cd ./progetto/client`
`npm install`
`npm start`

`cd ../server`
`npm install`
`npm start`
