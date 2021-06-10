# SaaSquatch-HubSpot-integration
A project created by volunteer software engineering students at the University of Victoria, in collaboration with SaaSquatch, for importing data from HubSpot into SaaSquatch. This project was created for the course Software Engineering 499 (Design Project II) at the University of Victoria.

## Environment Variables
The API requires environment variables PORT and HAPIKEY.
You can specify them in the terminal:

```
PORT=3000 HAPIKEY=... npm run integration
```

or alternatively create a `.env` file with the following:

```
PORT=3000
HAPIKEY=...
SAPIKEY=...
STENANTALIAS=...
// Hubspot App Properties
HUBSPOT_CLIENT_ID=...
HUBSPOT_CLIENT_SECRET=...
HUBSPOT_REDIRECT_URI=...
// Saasquatch Integration Properties
SAASQUATCH_CLIENT_ID=...
SAASQUATCH_CLIENT_SECRET=...
```

To start the integration:
```
npm install && npm install --prefix ./frontend
```
```
npm run integration
```

