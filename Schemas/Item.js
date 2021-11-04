const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item = new Schema({
    name: String,
    quantity: { type: Number, default: 1 },
    description: { type: String, default: '' },
});

module.exports = mongoose.model('Item', item);
