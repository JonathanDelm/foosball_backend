const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Match = new Schema({
    winningPlayer1: {
        type: String
    },
    winningPlayer2: {
        type: String
    },
    losingPlayer1: {
        type: String
    },
    losingPlayer2: {
        type: String
    },
    scoreWinningTeam: {
        type: Number
    },
    scoreLosingTeam: {
        type: Number
    },
    dateAdded: {
        type: Date
    }
}, {
  collection: 'matches'
})

module.exports = mongoose.model('Match', Match)