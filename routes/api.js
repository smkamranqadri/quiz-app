var express = require("express"),
    router  = express.Router();

router.get('/', function(req, res, next){
	res.render('index');
});

router.get('/partials/:partialfile', function(req, res){
	res.render('partials/' + req.params.partialfile);
});

router.use('/quiz', isAuthenticated);



function isAuthenticated (req, res, next) {
    
	if (req.isAuthenticated()){
        return next();
    }
	return res.redirect('/#login');
};

module.exports = router;