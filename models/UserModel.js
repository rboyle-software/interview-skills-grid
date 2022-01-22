const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    boardContent: {
        type: Array,
        required: true
    },
    userFavorites: {
        type: Array,
        required: true
    },
    userPosts: {
        type: Array,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true
    }
});


// const FavoritesSchema = new Schema({
//     promptID: {
//         type: String,
//         required: true
//     },
//     faved_at: {
//         type: Date,
//         default: Date.now(),
//         required: true
//     }
// });


// const UserPostsSchema = new Schema({
//     promptID: {
//         type: String,
//         required: true
//     },
//     posted_at: Date,
//     default: Date.now(),
//     required: true
// });


const User = new mongoose.model('Users', UserSchema);

module.exports = { UserSchema };