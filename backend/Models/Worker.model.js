const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  yardLocked: String,
  dangerSignDisplayed: String,
  areaClearOfVegetation: String,
  voltage: Number,
  current: Number,
  powerFactor: Number
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
