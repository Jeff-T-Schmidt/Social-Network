const connection = require('../config/connection');
const { User, Thought } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
    try {
        console.log('connected');
        await Thought.deleteMany({});
        await User.deleteMany({});
        
        const thoughts = [
            {
                thoughtText: "My brain is starting to hurt!",
                username: 'jeff',
                reaction: 'thumbs up!',

            },
            {
                thoughtText: "My blah is starting to hurt!",
                username: 'jeff',
                reaction: [
                    {
                       reactionId:,
                       reactionBody:,
                       username:, 
                    }
                ]

            },
            {
                thoughtText: "My brain is starting to hurt!",
                username: 'jeffa',
                reaction: 'thumbs up!',

            },
            {
                thoughtText: "My brain is starting to hurt!",
                username: 'jeffb',
                reaction: 'thumbs up!',
                
            }
        ]
        const thoughtDb = await Thought.collection.insertMany(thoughts);
        const users = [
            {
                username: 'jeff',
                email: 'jeff@jeff.com',
                thoughts: [thoughtDb.insertedIds['0'], thoughtDb.insertedIds['1']]
            },
            {
                username: 'jeffa',
                email: 'jeffa@jeff.com',
                thoughts: [thoughtDb.insertedIds['2']]
            },
            {
                username: 'jeffb',
                email: 'jeffb@jeff.com',
                thoughts: [thoughtDb.insertedIds['3']]
            }
        ];

        const userDb = await User.collection.insertMany(users);

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
