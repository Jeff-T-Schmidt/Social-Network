const connection = require('../config/connection');
const { User, Thought } = require('../models');
const createUser = require('./user');
const thoughts = require('./thought');



connection.on('error', (err) => err);

connection.once('open', async () => {
    try {
        console.log('connected');
        await Thought.deleteMany({});
        await User.deleteMany({});
        
        
        const thoughtDb = await Thought.collection.insertMany(thoughts);


        const userDb = await User.collection.insertMany(createUser(thoughtDb));

        // console.table(users);
        // console.table(thoughts);
        console.log(userDb.insertedIds['0'])
        console.log(thoughtDb)
        console.info('Seeding complete! 🌱');
    } catch (err) {
        console.log(err);
    }
    process.exit(0);
});
