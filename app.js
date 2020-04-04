let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
dataBaseConfig = require('./database/db');

// Connect to the mlab database when running in production
mongoLabUri = process.env.MONGOLAB_URI;

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect((mongoLabUri || dataBaseConfig.db), {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port
const matchRoute = require('../foosball_backend/routes/match.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Uit online demo (als alles in 1 project zou staan)
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'dist/foosball')));
// app.use('/', express.static(path.join(__dirname, 'dist/foosball')));

// Uit hogent tutorial
app.use(cors({origin: "*"}));

app.use('/api', matchRoute)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});