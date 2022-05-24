function createUser({insertedIds}){

    const users = [
        {
            username: 'jeff',
            email: 'jeff@jeff.com',
            thoughts: [insertedIds['0'], insertedIds['1']]
        },
        {
            username: 'jeffa',
            email: 'jeffa@jeff.com',
            thoughts: [insertedIds['2']]
        },
        {
            username: 'jeffb',
            email: 'jeffb@jeff.com',
            thoughts: [insertedIds['3']]
        },
        {
            username: 'jeff1',
            email: 'jeff1@jeff.com',
            thoughts: [insertedIds['4']]
        }
    ];
    return users;
}
module.exports = createUser;