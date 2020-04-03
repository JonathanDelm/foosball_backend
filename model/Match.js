const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Match = new Schema({
    player1Team1: {
        type: String
    },
    player2Team1: {
        type: String
    },
    player1Team2: {
        type: String
    },
    player2Team2: {
        type: String
    },
    scoreTeam1: {
        type: Number
    },
    scoreTeam2: {
        type: Number
    },
    dateAdded: {
        type: Date
    }
}, {
  collection: 'matches'
})

module.exports = mongoose.model('Match', Match)