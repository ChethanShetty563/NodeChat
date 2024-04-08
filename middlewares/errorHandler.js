exports.notFound = function notFound(req, res, next) {
    res.send(`You seem to be lost`)
}
exports.error = function error(err, req, res, next) {
    console.log(err);
    res.send(500, 'Something broke. What did you do?');
};