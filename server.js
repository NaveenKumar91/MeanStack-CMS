var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
var api = require('./server/routes/api');
var userapi = require('./server/routes/user-api');

var port = 8000;
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//app.use(express.static(__dirname + '/public'));
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);
app.use('/user', userapi);

app.use('*',function (req, res) {
    res.redirect('/');
    
});

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
})