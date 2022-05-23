const connection = require('../config/connection');
const { User, Thought } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [
      new User({
          username: 'jeff',
          email: 'jeff@jeff.com',   
      })
  ];
  const thoughts = [
      new Thought ({
          thoughtText: "My brain is starting to hurt!",
          createdAt: "",
          username: 'albert',
          reaction: 'thumbs up!',

      })
  ]


  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
