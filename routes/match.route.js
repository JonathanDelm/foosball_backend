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
// matchRoute.route('/delete-match/:id').delete((req, res, next) => {
//   Match.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data
//       })
//     }
//   })
// })

module.exports = matchRoute;