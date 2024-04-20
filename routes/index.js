// const session = require("express-session");
var util = require('../middlewares/utilities');
var config = require('../config');


function index(req, res){
  res.cookie('IndexCookie', 'This was set from Index');
  res.render('index',{layout : 'layout', title : 'Index'})
 
};
function login(req, res){
  res.render('login', {layout : 'layout', title : 'Login', message : req.flash('error')});
};
function loginProcess(req, res){
  var isAuth = util.auth(req.body.username, req.body.password, req.session);
  if (isAuth) {
    res.redirect('/chat');
  }else {
    req.flash('error','Wrong username and password')
    res.redirect(config.routes.login);
  }
};
function chat(req, res){
  res.render('chat',{layout : 'layout', title : 'Chat'});
};
function logOut(req, res){
  util.logOut(req.session);
  res.redirect('/');
};

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.logout = logOut;