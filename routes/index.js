var express = require('express');
var router = express.Router();

var mongoQuery = require('../class/mongoQuery');

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/home');
});
router.get('/home', function(req, res) {
	// pour l'instant on charge l'histo à l'identification
	/*mongoQuery.getHistoricSms(function(e,data){
		// faire gestion erreur
		res.render('index',{title: 'Chat', historic: data});
	});*/
	res.render('index',{title: 'Chat', historic: {}});
});

/* GET query page. */
router.get('/query', function(req, res) {
	res.render('query',{title: 'Query'});
});

// about page
router.get('/about', function(req, res) {
    res.render('about', {title: 'Social Sandbox\'s team introduction' });
});

module.exports = router;