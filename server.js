const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let Item = require("./Schemas/Item");

const database = mongoose.connect("mongodb://localhost/practice-db");

app.listen(3000, function () {
    console.log("Now running on port 3000!");
});

app.post("/items/additem", function (request, response) {
    let dbitem = new Item(request.body);

    dbitem.save(function (error, savedItem) {
        if (error) {
            response.status(500).send("Error creating item");
        } else {
            response.send(savedItem);
        }
    });
});

app.get("/items", function (request, response) {
    Item.find({}, function (error, items) {
        if (error) {
            response.status(500).send("Failed to get items from the database");
        } else {
            response.send(items);
        }
    });
});

app.delete("/items/removeitem/:itemID", function (request, response) {
    Item.deleteOne(
        { _id: request.params.itemID },
        function (error, deletedItem) {
            if (error) {
                response.status(500).send("Failed to delete the given item");
            } else {
                response.send(
                    `Item with the id of "${request.params.itemID}" was deleted from the database!`
                );
            }
        }
    );
});

app.put("/items/modify/:itemID", function (request, response) {
    Item.findByIdAndUpdate(
        request.params.itemID,
        {
            name: request.body.name,
            quantity: request.body.quantity,
            description: request.body.description,
        },
        function (error, items) {
            if (error) {
                response.status(500).send("Error while modifying the item");
            } else {
                response.send("Item updated successfully!");
            }
        }
    );
});
