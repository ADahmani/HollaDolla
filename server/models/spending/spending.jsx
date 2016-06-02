const mongoose = require('mongoose');

const Spending = new mongoose.Schema({

  // Created time
  created: {type: Date, default: Date.now},

  // person who paid
  from: {type: String},

  // person who recevied
  to: {type: String},

  // amount spent
  amount: {type: String},

  // Projet Id
  projet: {type: String},

});

export default mongoose.model('Spending', Spending);
