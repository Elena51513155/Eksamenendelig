//her håndterer vi menupunkter

var path = require("path");

exports.frontpage_get = function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/register.html"));

};