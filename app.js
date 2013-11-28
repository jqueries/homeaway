var express = require('express.io');
var app = express().http().io();

// all environments
app.configure(function(){
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use("/stylesheets", express.static(__dirname + '/public/stylesheets'));
	app.use("/javascripts", express.static(__dirname + '/public/javascripts'));
	app.use(express.session({secret: 'oliver'}));
	app.set('view engine', 'ejs');
});

var routes = require('./routes')(app);

app.io.route('update score', function(req) {

	console.log(req.data);

    app.io.broadcast('current score', {'score': req.data});
});


app.listen(6789);
console.log('\n\n\nExpress server listening on port 6789');
