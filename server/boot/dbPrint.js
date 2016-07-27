module.exports = function enableAuthentication(app) {
  // Print all DB querys
	var memoryConnector = app.models.Person.getDataSource().connector;
	var mongoConnector = app.models.PersonMongo.getDataSource().connector;

	function logReq(ctx, next) {
		console.log('DB Execute [' + ctx.req.command + '] Params: ' + JSON.stringify(ctx.req.params));
	  next();		
	}

	memoryConnector.observe('before execute', logReq);
	mongoConnector.observe('before execute', logReq);
};
