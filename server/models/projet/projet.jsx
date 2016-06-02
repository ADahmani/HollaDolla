const mongoose = require('mongoose');

const STATES = {
  CLOSED: 'closed',
  OPEN: 'open'
};

const Projet = new mongoose.Schema({

  // Created time
  created: {type: Date, default: Date.now},

  // Title of projet
  name: {type: String},

  type: {type: String},

  // city where the project was made
  city: {type: String, default: '0,0'},

  // les participants of projet
  participants: {type: [String]},

  // total spendings of projet
  spendings: {type: String, default: '0'},

  // celui qui a crée le projet
  owner: {type: String},

  // state of project
  state: {type: String, enum: ['closed', 'open'], default: STATES.OPEN},

});

Projet.statics.STATES = STATES;

export default mongoose.model('Projet', Projet);
