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

  app.models.Person.create(person, function(err, model) {
    if (err) throw err;

    console.log('Created:', model);

    ds.disconnect();
  });
});