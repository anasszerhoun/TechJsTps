
const http = require('node:http')


const server = http.createServer((req,res)=>{

    res.writeHead(200,{"Content-Type":"text/html"})
    if(req.url=="/"){
        res.write("<h1>Home Page</h1>")
        res.end()
    }
    if(req.url=="/contact"){
        res.write("<h1>Contacts Page</h1>")
        res.end()
    }
    if(req.url=="/aboutUs"){
        res.write("<h1>About Us</h1>")
        res.end()
    }
    else{
        res.write("<h1>404 Page Not Found!")
        res.end()
    }

})


server.listen(3000,()=>{
    console.log("Server Running on 3000.")
})

