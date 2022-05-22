const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText:
        {
            String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt:
        {
            Date,
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
              },
        },
        username: //(The user that created this thought)
        {
            String,
            required: true,
        },
        reactions: [Reaction],
    },
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return `${this.reactions.length}`;
    })
// Setter to set the first and last name
// .set(function (v) {
//   const first = v.split(' ')[0];
//   const last = v.split(' ')[1];
//   this.set({ first, last });
// });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
