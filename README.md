# Asset Generator

1. `npm i`
2. `npm start`
3. Surf to `localhost:3000`

Currently it's able to generate badges based on a CSV and a schedule based on remote data.

To load CSV, place the file to the project root as **tickets.csv** and run `npm start:csv`. That will parse the file, set up a GraphQL interface, and run a server at port 4000. The frontend is able to pick up the data from there.

## Credits

The badge generator is based on [ReasonConf](https://github.com/ReasonVienna/reason-conf) one.
