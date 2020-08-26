var http  = require('http')
var app = require('./app')

var server = http.createServer(app);

server.listen(3004,()=>{
    console.log("Order service listening to port 3004")
})