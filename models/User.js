const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
    username:
    { 
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email:
    {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/
    },
    //Array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    //Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },

  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  })
  // Setter to set the first and last name
  // .set(function (v) {
  //   const first = v.split(' ')[0];
  //   const last = v.split(' ')[1];
  //   this.set({ first, last });
  // });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
