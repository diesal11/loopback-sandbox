# loopback-sandbox

A repository for reproducing [LoopBack community issues][wiki-issues].

[wiki-issues]: https://github.com/strongloop/loopback/wiki/Reporting-issues

This repo reproduces the Loopback Model ID Scientific Notation bug.
There are two models included, Person and PersonMongo. Person is attached to an in memory connector and PersonMongo is attached to a MongoDB connector.

You will need to have MongoDB running locally on port 27017.
If docker is your flavour like me then you can just run `docker-compose up` in this repo to launch a mongo server.
run `docker-compose rm` when you're done to cleanup.

I've set the Envrionment Variable `DEBUG=strong-remoting:shared-method` for debugging (We can see what strong-remoting is sending to the connector) There's a few other debugging things i've added in to visulaize where the issues lie

Steps to reproduce:

1. Run `node bin/autoMigrateMongo.js` to create the Mongo document with faulty ID. This saves in Mongo as expected.
2. Run `node bin/autoMigrate.js` to create the in memory Document with faulty ID (Note in the console and db.json that it has been created with scientific notation in the ID)
3. Run `npm test` to run Mocha tests that reproduce the issues with `strong-remoting`
