var express = require('express');
var router = express.Router();

var mongoQuery = require('../class/mongoQuery');

/* GET query page. */
router.get('query', function(req, res) {
	res.render('query',{title: 'Query'});
});

module.exports = router;