"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pubsub = undefined;

var _schema = require("./schema");

var _schema2 = _interopRequireDefault(_schema);

var _graphqlSubscriptions = require("graphql-subscriptions");

var _typescript = require("typescript");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require("express");

var cors = require("cors");
var graphqlHTTP = require("express-graphql");
var session = require("express-session");

var _require = require("graphql"),
    buildSchema = _require.buildSchema;

var pubsub = exports.pubsub = new _graphqlSubscriptions.PubSub();

var Post = function Post(id, _ref) {
  var title = _ref.title,
      content = _ref.content,
      author = _ref.author;

  _classCallCheck(this, Post);

  this.id = id;
  this.title = title;
  this.content = content;
  this.author = author;
};

var Author = function Author(id, _ref2) {
  var name = _ref2.name;

  _classCallCheck(this, Author);

  this.id = id;
  this.name = name;
};

// Maps username to content


var fakeDatabase = [];

var fakeAuthorDatabase = [];

var root = {
  posts: function posts() {
    return fakeDatabase;
  },
  authors: function authors() {
    return fakeAuthorDatabase;
  },

  getPost: function getPost(_ref3) {
    var id = _ref3.id;

    find(fakeDatbase, { id: id });
  },
  getAuthor: function getAuthor(_ref4) {
    var id = _ref4.id;

    find(fakeAuthorDatabase, { id: id });
  },
  createAuthor: function createAuthor(_ref5) {
    var input = _ref5.input;

    // Create a random id for our "database".
    var id = require("crypto").randomBytes(10).toString("hex");
    input.id = id;
    console.log(input);

    fakeAuthorDatabase.push(input);
    return input;
  },
  createPost: function createPost(_ref6) {
    var input = _ref6.input;

    // Create a random id for our "database".
    var id = require("crypto").randomBytes(10).toString("hex");

    input.id = id;
    fakeDatabase.push(input);
    return input;
  },
  updatePost: function updatePost(_ref7) {
    var id = _ref7.id,
        input = _ref7.input;

    if (!fakeDatabase[id]) {
      throw new Error("no post exists with id " + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Post(id, input);
  }
};

// Authentication and Authorization Middleware
var auth = function auth(req, res, next) {
  console.log(req);
  if (req.session && req.session.user === "amy" && req.session.admin) return next();else return res.sendStatus(401);
};

var app = express();

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  httpOnly: true,
  cookie: { maxAge: 60000 }
}));

var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use("/graphql", auth, graphqlHTTP({
  schema: _schema2.default,
  rootValue: root,
  graphiql: true
}));

// Login endpoint
app.get("/login", function (req, res) {
  console.log(req.query);
  if (!req.query.username || !req.query.password) {
    res.send("login failed");
  } else if (req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});

// Logout endpoint
app.get("/logout", function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.listen(4000, function () {
  console.log("Running a GraphQL API server at localhost:4000/graphql");
});