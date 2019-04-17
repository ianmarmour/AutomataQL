var express = require("express");
import schema from "./schema";
const cors = require(`cors`);
const graphqlHTTP = require("express-graphql");
var session = require("express-session");
import { PubSub } from "graphql-subscriptions";

import { isFunctionTypeNode, findConfigFile } from "typescript";
var { buildSchema } = require("graphql");

export const pubsub = new PubSub();

class Post {
  constructor(id, { title, content, author }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }
}

class Author {
  constructor(id, { name }) {
    this.id = id;
    this.name = name;
  }
}

// Maps username to content
var fakeDatabase = [];

var fakeAuthorDatabase = [];
const resolvers = {
  Query: {
    posts(context) {
      return fakeDatabase;
    }
  }
};

var root = {
  authors: function(context) {
    return fakeAuthorDatabase;
  },

  getPost: function({ id }) {
    find(fakeDatbase, { id: id });
  },
  getAuthor: function({ id }) {
    find(fakeAuthorDatabase, { id: id });
  },
  createAuthor: function({ input }) {
    // Create a random id for our "database".
    var id = require("crypto")
      .randomBytes(10)
      .toString("hex");
    input.id = id;
    console.log(input);

    fakeAuthorDatabase.push(input);
    return input;
  },
  createPost: function({ input }) {
    // Create a random id for our "database".
    var id = require("crypto")
      .randomBytes(10)
      .toString("hex");

    input.id = id;
    fakeDatabase.push(input);
    return input;
  },
  updatePost: function({ id, input }) {
    if (!fakeDatabase[id]) {
      throw new Error("no post exists with id " + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Post(id, input);
  }
};

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  console.log(req);
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else return res.sendStatus(401);
};

var app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    httpOnly: true,
    cookie: { maxAge: 60000 }
  })
);

var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(
  "/graphql",
  auth,
  graphqlHTTP((request, response) => ({
    schema: schema,
    rootValue: root,
    resolvers: resolvers,
    graphiql: true,
    context: {
      request: request
    }
  }))
);

// Login endpoint
app.get("/login", function(req, res) {
  console.log(req.query);
  if (!req.query.username || !req.query.password) {
    res.send("login failed");
  } else if (
    req.query.username === "amy" ||
    req.query.password === "amyspassword"
  ) {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});

// Logout endpoint
app.get("/logout", function(req, res) {
  req.session.destroy();
  res.send("logout success!");
});

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.listen(4000, () => {
  console.log("Running a GraphQL API server at localhost:4000/graphql");
});
