const mongoose = require('mongoose');

const User = new mongoose.Schema({

  // Created time
  created: {type: Date, default: Date.now},

  first_name: {type: String},

  last_name: {type: String},

  email: {type: String},

  password: {type: String}

});

export default mongoose.model('User', User);
