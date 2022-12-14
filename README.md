## Incident Report API

## Description

Project Overview
Incident Report API is an assignment given by Enyata Ghana. As part of this test, i was tasked to create endpoints to submit and list incident reports for insurance clients..


## HOSTED LINKS
- live endpoint = https://incident-report-api-production-de33.up.railway.app/api/v1
- live documentation = https://incident-report-api-production-de33.up.railway.app/docs/
- check api health = https://incident-report-api-production-de33.up.railway.app/api/v1/health

## Getting Started

### Dependencies

-   npm, node, postgress, are needed before installing program.

### Installing

-  Clone the repo
    ```sh
    git clone https://github.com/beblicarl/incident-report-api.git
    ```
-  Install NPM packages
    ```sh
    npm install
    ```
-  Create a .env file `.env` and update with env variables (check the .env.sample)

### Executing program

- `npm run dev`
   Runs the app in the development mode.



### Test Scope: Incident reporting.

As part of this test, you are tasked to create endpoints to submit and list incident reports for insurance clients.

#### The required working flow:
- A POST endpoint that receives the incident report.

#### The report should have the following data :
- { “client_id”: number, “incident_desc: string, “city”: string, “country”: string }
- The endpoint receives the report, adds weather data and stores it in a table “incidents”.
- The weather report should be fetched from the API service of https://openweathermap.org/current

#### The stored object should be then as follow :
- { “client_id”: number, “incident_desc: string, “city”: string, “country”: string, “date”: date, “weather_report”: object }
- A GET endpoint that lists all the incidents.

#### The required stack :
NodeJS and express.
PostgreSQL.