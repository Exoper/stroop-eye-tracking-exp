var express = require('express'),
    body_parser = require('body-parser'),


// --- INSTANTIATE THE APP
app = express();
// --- STATIC MIDDLEWARE 
app.use(express.static(__dirname+'/public'));
app.use('/jspsych', express.static(__dirname + "/jspsych"));

console.log(__dirname);

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname+'/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// --- ROUTING
app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/experiment', function(request, response) {
    response.render('Stroop_colorword.html');
});



// --- START THE SERVER 
var server = app.listen(process.env.PORT , function(){
    console.log("Listening on port %d", server.address().port);
});

