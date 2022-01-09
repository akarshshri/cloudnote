const mongoose = require ('mongoose');

const UserSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        unique: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes',NotesSchema)