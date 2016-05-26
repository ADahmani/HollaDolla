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

  // state of project
  state: {type: String, enum: ['closed', 'open'], default: STATES.OPEN},

});

Projet.statics.STATES = STATES;

export default mongoose.model('Projet', Projet);
