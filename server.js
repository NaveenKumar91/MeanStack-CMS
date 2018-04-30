var express = require('express');
var bodyParser = require('body-parser');

var api = require('./server/routes/api');
var userapi = require('./server/routes/user-api');

var port = 8000;
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));


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