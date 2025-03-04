const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const port = 8000;
const app = express();

app.use(express.json());
app.use(express.static('public'));


async function getDbCollection(dbAddress, dbName, collectionName) {
    const client = new MongoClient(dbAddress);
    await client.connect();
    const db = client.db(dbName);

    return db.collection(collectionName);
}

app.get('/tasks', async function (req, res) {
    const collection = await getDbCollection('mongodb://127.0.0.1', 'todo_app', 'tasks');
    const data = await collection.find({}).toArray();

    res.send(data);
});

app.get('/tasks/:id', async function (req, res) {
    const collection = await getDbCollection('mongodb://127.0.0.1', 'todo_app', 'tasks');

    const data = await collection.findOne({ '_id': new ObjectId(req.params.id) });

    res.send(data);
});

app.post('/tasks', async function (req, res) {
    const collection = await getDbCollection('mongodb://127.0.0.1', 'todo_app', 'tasks');
    const task = { ...req.body, done: false };

    await collection.insertOne(task);

    res.status(201).send(task);
});

app.delete('/tasks/:id', async function (req, res) {
    const collection = await getDbCollection('mongodb://127.0.0.1', 'todo_app', 'tasks');

    await collection.deleteOne({ '_id': new ObjectId(req.params.id) });

    res.status(204).send({});
});

app.patch('/tasks/:id', async function (req, res) {
    const collection = await getDbCollection('mongodb://127.0.0.1', 'todo_app', 'tasks');

    await collection.updateOne({ '_id': new ObjectId(req.params.id) },
        { '$set': req.body });

    res.status(200).send({});
});


app.listen(port, function () {
    console.log('Start server');
});
