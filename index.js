const express=require("express")
const fs=require("fs")
const path=require("path")
const morgan=require("morgan")
const { log } = require("console")

const app=express()
const PORT=3030

//middleware to parse JSON
app.use(express.json())

//create access.log file if it doesn't exist
const logStream=fs.createWriteStream(path.join(__dirname,'src','access.log'),{flags:'a'})

//setup morgan middleware to log requests to access.log 
app.use(morgan('method:status:res[content-length] - :response-time ms :date[clf] HTTP/:http-version :url',{stream:logStream}))

//Get route for /
app.get('/',(req,res)=>{
    res.status(200).send("welcome to the express server!")
})

//Get route for /get-users
app.get("/get-users",(req,res)=>{
    res.status(200).json({message:'List of users'})
})

// POST route for /add-user
app.post('/add-user',(req,res)=>{
    res.status(201).json({message:'user added successfully'})
})

// PUT route for /user/:id
app.put('/user/:id',(req,res)=>{
    res.status(201).json({message: `User with Id ${req.params.id} updated successfully`})
})
// DELETE route for /user/:id
app.delete('/user/:id',(req,res)=>{
    res.status(200).json({message:`user with ID ${req.params.id} deleted successfully`})
})

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
    
})