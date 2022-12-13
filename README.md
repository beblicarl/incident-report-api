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