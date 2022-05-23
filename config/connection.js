const { connect, connection } = require('mongoose');

connect('mongodb://localhost/SocialNetworking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
