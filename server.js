const express = require('express');
const {MongoClient} = require('mongodb');

const port = 8000;
const app = express();

app.use(express.static('public'))


app.get('/tasks', function (req, res) {
    const client = new MongoClient('mongodb://127.0.0.1');

    const db = client.db('todo_app');
    const collection = db.collection('tasks');
    
    const data = collection.find({}).toArray();

    res.send(data);
});

app.get('/tasks/:id', function (req, res) {

});

app.post('/tasks', function (req, res) {
    
});

app.delete('/tasks/:id', function (req, res) {

});

app.patch('/tasks/:id', function (req, res) {

});


app.listen(port, function () {
    console.log('Start express server');
});
