//Require Dependencies
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

//Declared DB Variables
let db,
    dbConnectionStr = process.env.DB_String,
    dbName = 'ghCollection'

//Connect to Mongo
MongoClient.connect(dbConnectionStr)
    .then(client=>{
        console.log(`Hey look we are connected to ${dbName} Database!`)
        db = client.db(dbName)
    })

//   SET MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//     CRUD METHODS
app.get('/', (req, res)=> {
    db.collection('stable').find().toArray()
    .then(data => {
        let nameList = data.map(item => item.character)
        console.log(nameList)
        res.render('index.ejs', {info: nameList})
    })
        .catch(error => console.log(error))
    
})

app.post('/api', (req, res)=> {
    console.log('Post Heard')
    db.collection('stable').insertOne(
        req.body
    )
    .then(result => {
        console.log(result)
        res.redirect('/')

    })

})

app.put('/updateEntry', (req, res) => {
    console.log(req.body)
    Object.keys(req.body).forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined || req.body[key] === ''){
            delete req.body[key];
        }
    });
    console.log(req.body)
    db.collection('stable').findOneAndUpdate(
        {character: req.body.character},
        {
            $set: req.body
        },
    )
        .then(result => {
            console.log(result)
            res.json('Success')
        })
        .catch(error => console.error(error))
})

app.delete('/deleteEntry', (req,res) => {
    db.collection('stable').deleteOne(
        {character: req.body.character}
    )
    .then(result =>{
        console.log('Entry Deleted')
        res.json('Entry Deleted')
    })
    .catch(error => console.error(error))
})

//Set up locahlhost on PORT
app.listen(PORT, (req, res)=>{
    console.log('Now listening on port 8005')
})