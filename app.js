var express = require('express');
var app = express();
var routes = require('./routes');
var errorHandler = require('./middlewares/errorHandler')
var log = require('./middlewares/log');
var partials = require('express-partials')
var cookieParser = require('cookie-parser')
var session = require('express-session')
// var RedisStore = require('connect-redis')(session);
var bodyParser =  require('body-parser')
var csrf = require('csurf');
var util = require('./middlewares/utilities')



app.set('view engine', 'ejs')
app.set('view options', {defaultLayout : 'layout'})
app.use(partials());
app.use(log.logger)
app.use(express.static(__dirname + '/static'));
app.use(cookieParser('secret'))
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    // store: new RedisStore(
    //   {url: 'redis://localhost'})
    })
  );
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);    
app.get('/chat',[util.requireAuthentication], routes.chat);
app.get('/logout', routes.logout)
app.get('/error', (req, res, next)=> {
    next(new Error('Something went wrong'))
})

app.use(errorHandler.error)
app.use(errorHandler.notFound)

app.listen(3000);
console.log("App server running on port 3000");