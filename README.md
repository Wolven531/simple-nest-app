# simple-nest-app

This is a NestJS app that acts as the "go between" for frontend apps that want data from Riot's API

# Running

From repository root directory - `npm run start:dev`

# Notes

This app requires a token to communicate w/ Riot's servers. You can generate one [here](https://developer.riotgames.com)

When running locally, make sure to set required environment variables before attempting to boot the app; otherwise, the default values from the `.env` file (at the repository root directory) will be used, which are intentionally invalid

In PowerShell -

```PowerShell
$env:RIOT_SECRET="YOUR_RIOT_TOKEN_HERE"
$env:SERVER_SECRET="YOUR_SERVER_SECRET_HERE"
```

## To-do

- [ ] add GHA that runs e2e tests
- [ ] add rate limiting for requests that would exceed Riot API rate limit
- [x] add endpoint to get all champion masteries for a summoner
- [x] add queue type param for stats (filter by queue)
- [x] add examples to swagger docs
- [x] improve query and param swagger docs
- [x] remove API key param from mastery service method signatures (inject AppService into MasteryService)
