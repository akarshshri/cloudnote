const connectToMongo = require('./db.js')
const express = require('express')
const path = require('path')

const app = express()
const port = 5000


//connectToMongo();
//Available Routes
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes')) 

const akarshMiddleware = (req,res,next)=>{
  console.log(req)
  next()
}

app.use(express.static(path.join(__dirname, 'public')))
//app.use(akarshMiddleware)

app.get('/',(req, res)=>{
  //res.sendFile(path.join(__dirname, 'public/index.html'))
  //res.status(404);
})
app.get('/about',(req, res)=>{
  res.send("This is about page")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 