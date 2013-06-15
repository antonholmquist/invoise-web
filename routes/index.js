
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

// Render test

exports.render = function(req, res){
	res.send("respond with a resource");
};