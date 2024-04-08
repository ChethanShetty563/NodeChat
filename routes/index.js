const session = require("express-session");


function index(req, res){
  res.cookie('IndexCookie', 'This was set from Index');
  res.render('index',{layout : 'layout', title : 'Index'})
 
};
function login(req, res){
  res.render('login', {layout : 'layout', title : 'Login'});
};
function loginProcess(req, res){
  res.redirect('/');
};
function chat(req, res){
  res.render('chat',{layout : 'layout', title : 'Chat'});
};

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;