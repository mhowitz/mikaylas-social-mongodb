const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
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
        get: dateVal => dateFormat(dateVal)
    },
    username: {
        type: String, 
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
})

const ReactionSchema = new Schema({
    reactionId : {
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        trim: true,
        maxlength: 280
    },
    username: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: dateVal => dateFormat(dateVal)
    }
},
    {
        toJSON: {
            getters: true,
        }
    });

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;