var http  = require('http')
var app = require('./app')

var server = http.createServer(app);

server.listen(3002,()=>{
    console.log("Users service listening to port 3002")
})