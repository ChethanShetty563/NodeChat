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
var flash = require('connect-flash');
var config = require('./config');



app.set('view engine', 'ejs')
app.set('view options', {defaultLayout : 'layout'})
app.use(partials());
app.use(log.logger)
app.use(express.static(__dirname + '/static'));
app.use(cookieParser(config.secret))
app.use(session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
    // store: new RedisStore(
    //   {url: config.redisUrl})
    })
  );
  app.use(bodyParser.json());
  app.use(flash())
  app.use(util.templateRoutes);
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.get('/', routes.index);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);    
app.get('/chat',[util.requireAuthentication], routes.chat);
app.get(config.routes.logout, routes.logout)
app.get('/error', (req, res, next)=> {
    next(new Error('Something went wrong'))
})

app.use(errorHandler.error)
app.use(errorHandler.notFound)

app.listen(config.port);
console.log("App server running on port 3000");