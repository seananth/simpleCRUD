const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect('mongodb+srv://dbUser:dbUserPassword@cluster0.ztuxj.mongodb.net/test?retryWrites=true&w=majority', 
{ useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('quotes')
    const quotesCollection = db.collection('quotes')

        app.get("/", (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })

        //post
        app.post("/quotes", (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.log(error))
            
        })

        app.listen(3000, () => {
            console.log('listening on port 3000')
        })

})
.catch(error => console.error(error))


