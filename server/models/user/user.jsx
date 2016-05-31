const mongoose = require('mongoose');

const User = new mongoose.Schema({

  // Created time
  created: {type: Date, default: Date.now},

  firstName: {type: String},

  userName: {type: String},

  lastName: {type: String},

  email: {type: String},

  password: {type: String}

});

export default mongoose.model('User', User);
