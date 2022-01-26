const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    boardContent: {
        type: Array,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true
    }
});


UserSchema.plugin(findOrCreate);

const User = new mongoose.model('Users', UserSchema);

module.exports = { User };  