var http  = require('http')
var app = require('./app')

var server = http.createServer(app);

server.listen(3003,()=>{
    console.log("Cart service listening to port 3003")
})