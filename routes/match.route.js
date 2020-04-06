const express = require('express');
const app = express();
const matchRoute = express.Router();

// Match model
let Match = require('../model/Match');

// Add Match
matchRoute.route('/add-match').post((req, res, next) => {
  Match.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all matches
matchRoute.route('/').get((req, res) => {
  Match.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single match
matchRoute.route('/read-match/:id').get((req, res) => {
  Match.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update match
// matchRoute.route('/update-match/:id').put((req, res, next) => {
//   Match.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('Match successfully updated!')
//     }
//   })
// })

// Delete match
matchRoute.route('/delete-match/:id').delete((req, res, next) => {
  Match.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Get all players who played at least 1 match
matchRoute.route('/players').get((req, res) => {
  Match.aggregate([
    { $group: { 
      "_id": { 
        "players": ["$winningPlayer1", "$winningPlayer2", "$losingPlayer1", "$losingPlayer2"]
      }
    }},
    { $unwind: '$_id.players' },
    { $group: {_id: '$_id.players'} },
    { $match: {_id: { $not: { $eq: ""} } } }
  ], (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
})

// Get the number of solo matches per player
matchRoute.route('/solo-matches').get((req, res) => {
  Match.aggregate([
    { $match: {winningPlayer2: ""} },
    { $group: { 
      "_id": { 
        "players": ["$winningPlayer1", "$losingPlayer1"]
      },
      "count": { "$sum": 1 }
    }},
    { $unwind: '$_id.players' },
    { $group: {_id: '$_id.players', count: {$sum: "$count"}} }
  ], (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
})

// Get the number of solo wins per player
matchRoute.route('/solo-wins').get((req, res) => {
  Match.aggregate([
    { $match: {winningPlayer2: ""} },
    { $group: { 
      "_id": "$winningPlayer1",
      "count": { "$sum": 1 }
    }}
  ], (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
})

// Get the number of duo matches per player
matchRoute.route('/duo-matches').get((req, res) => {
  Match.aggregate([
    { $match: {
      $and: [ 
        { winningPlayer2: { $not: { $eq: ""} } },
        { losingPlayer2: { $not: { $eq: ""} } }
      ]
    } },
    { $group: { 
      "_id": { 
        "players": ["$winningPlayer1", "$winningPlayer2", "$losingPlayer1", "$losingPlayer2"]
      },
      "count": { "$sum": 1 }
    }},
    { $unwind: '$_id.players' },
    { $group: {_id: '$_id.players', count: {$sum: "$count"}} }
  ], (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
})

// Get the number of duo wins per player
matchRoute.route('/duo-wins').get((req, res) => {
  Match.aggregate([
    { $match: {winningPlayer2: { $not: { $eq: ""} } } },
    { $group: { 
      "_id": { 
        "winners": ["$winningPlayer1", "$winningPlayer2"]
      },
      "count": { "$sum": 1 }
    }},
    { $unwind: '$_id.winners' },
    { $group: {_id: '$_id.winners', count: {$sum: "$count"}} }
  ], (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
})

module.exports = matchRoute;