const { Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText : {
        type: String, 
        required: true,
        minlength:  1,
        maxlength: 208
    },
    createdAt : {
        type: Date,
        default: Date.now,
        
    }
})