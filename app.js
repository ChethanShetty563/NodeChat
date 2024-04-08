var express = require('express');
var app = express();
var routes = require('./routes');
var errorHandler = require('./middlewares/errorHandler')
var log = require('./middlewares/log');

app.set('view engine', 'ejs')
app.use(log.logger)
app.use(express.static(__dirname + 'static'));
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);    
app.get('/chat', routes.chat);
app.get('/error', (req, res, next)=> {
    next(new Error('Something went wrong'))
})

app.use(errorHandler.error)
app.use(errorHandler.notFound)

app.listen(3000);
console.log("App server running on port 3000");