const async = require('async');
const path = require('path');

const app = require(path.resolve(__dirname, '../server/server'));
const ds = app.datasources.db;

ds.automigrate('Person', function(err) {
  if (err) throw err;

  const brokenId = '578864759562170021143369';

  const person = {
    id: brokenId,
    name: 'Test User',
  };

  // Attempt to create document with broken ID
  app.models.Person.create(person, function(err, model) {
    if (err) {
      console.log(err.message);
      process.exit(0);
    }

    console.log('Created:', model);

    app.models.Person.find((err, people) => {
      console.log(people);
      ds.disconnect();
      process.exit(0);
    });
  });
});