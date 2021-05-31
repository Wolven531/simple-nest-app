# simple-nest-app

Simple NestJS app

# Running

From repository root directory - `npm run start:dev`

# Notes

This app requires a token to communicate w/ Riot's servers. You can generate one [here](https://developer.riotgames.com/)

When running locally, make sure to set required environment variables before attempting to boot the app

In PowerShell -

```PowerShell
$env:RIOT_SECRET="YOUR_RIOT_TOKEN_HERE"
$env:SERVER_SECRET="YOUR_SERVER_SECRET_HERE"
```
