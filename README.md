## Incident Report API

## Description

Project Overview
Incident Report API is an assignment given to Enyata Ghana. This api lists incident reports for insurance clients..
An in-depth paragraph about your project and overview of use.

## HOSTED LINKS
- live endpoint = https://incident-report-api-production-de33.up.railway.app/api/v1
- live documentation = https://incident-report-api-production-de33.up.railway.app/docs/

## Getting Started

### Dependencies

-   npm, node, postgress, are needed before installing program.

### Installing

2.  Clone the repo
    ```sh
    git clone https://github.com/beblicarl/incident-report-api.git
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Create a .env file `.env` and update with env variables (check the .env.sample)

### Executing program

1. `npm run dev`
   Runs the app in the development mode.\

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Help

Any advise for common problems or issues.


## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

-   0.2
    -   Various bug fixes and optimizations
    -   See [commit change]() or See [release history]()
-   0.1
    -   Initial Release


## Acknowledgments

Inspiration, code snippets, etc.

-   [awesome-readme](https://github.com/matiassingers/awesome-readme)
-   [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
-   [dbader](https://github.com/dbader/readme-template)
-   [zenorocha](https://gist.github.com/zenorocha/4526327)
-   [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)




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