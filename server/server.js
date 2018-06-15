var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
//var config = require('config.json');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var users = require('./routes/users');

var port = 3000;

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
// app.use(express.static(path.join(__dirname, 'myproj')));
app.use(express.static(path.join(__dirname, 'views/dist/myproj')));

app.use(cors());

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', tasks);
app.use('/api', users);

app.listen(port, function () {
    console.log('Server started on port : ' + port);
});