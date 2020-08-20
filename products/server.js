var http  = require('http')
var app = require('./app')

var server = http.createServer(app);

server.listen(3001,()=>{
    console.log("Products service listening to port 3001")
})