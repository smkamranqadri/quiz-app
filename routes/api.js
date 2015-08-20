var express = require("express"),
    router  = express.Router();

router.get('/partials/:partialfile', function(req, res){
	res.render('partials/' + req.params.partialfile);
});

router.get('/', function(req, res, next){
	res.render('index');
});

module.exports = router;