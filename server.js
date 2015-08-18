var express = require("express"),
    app     = express(),
	port    = process.env.port || 3000;

app.get('/',function(req, res){
	res.render('index.jade');
});

app.get('/partials/:partialfile',function(req, res){
	res.render('partials/' + req.params.partialfile + '.jade');
});

app.use(express.static('public'));

app.listen(port);

console.log('server running on port : ' + port + '...');