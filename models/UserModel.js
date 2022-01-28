const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    boardContent: {
        type: Array,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
});


UserSchema.plugin(findOrCreate);

const User = new mongoose.model('Users', UserSchema);

module.exports = { User };  