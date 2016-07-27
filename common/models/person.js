module.exports = function(Person) {
	Person.beforeRemote('**', function(ctx, instance, next) {
		console.log('BeforeRemote req.params: ' + JSON.stringify(ctx.req.params));
		console.log('BeforeRemote req.body: ' + JSON.stringify(ctx.req.body));
		next();
	});
}