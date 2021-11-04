const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let Item = require('./Schemas/Item');

const database = mongoose.connect('mongodb://localhost/practice-db');

app.listen(3000, function () {
    console.log('Now running on port 3000!');
});

app.post('/additem', function (request, response) {
    let dbitem = new Item(request.body);

    dbitem.save(function (error, savedItem) {
        if (error) {
            response.status(500).send('Error creating item');
        } else {
            response.send(savedItem);
        }
    });
});

app.get('/getitems', function (request, response) {
    Item.find({}, function (error, items) {
        if (error) {
            response.status(500).send('Failed to get items from the database');
        } else {
            response.send(items);
        }
    });
});
