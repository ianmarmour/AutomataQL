"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

var _lodash = require("lodash");

var _createPost = _interopRequireDefault(require("./mutations/post/createPost"));

var _createAuthor = _interopRequireDefault(require("./mutations/author/createAuthor"));

var _posts = _interopRequireDefault(require("./queries/post/posts"));

var _getPost = _interopRequireDefault(require("./queries/post/getPost"));

var _authors = _interopRequireDefault(require("./queries/author/authors"));

var _getAuthor = _interopRequireDefault(require("./queries/author/getAuthor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  scalar DATE\n\n  input authorInput {\n    email: String\n    name: String\n  }\n\n  input postInput {\n    title: String\n    author: String\n    content: String\n  }\n\n  type Post {\n    date: DATE\n    title: String\n    author: String\n    content: String\n    id: ID!\n  }\n\n  type Author {\n    email: String!\n    name: String!\n    id: ID!\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    authors: [Author]\n    posts: [Post]\n    getPost(id: ID): Post\n    getAuthor(id: ID): Author\n  }\n\n  type Mutation {\n    createAuthor(input: authorInput): Author!\n    createPost(input: postInput): Post!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("apollo-server"),
    gql = _require.gql;

var _require2 = require("apollo-server"),
    makeExecutableSchema = _require2.makeExecutableSchema; // Construct a schema, using GraphQL schema language


var typeDefs = gql(_templateObject());
var resolvers = (0, _lodash.merge)(_posts["default"], _getPost["default"], _authors["default"], _getAuthor["default"], _createPost["default"], _createAuthor["default"]);
var schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
var _default = schema;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEudHN4Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJncWwiLCJtYWtlRXhlY3V0YWJsZVNjaGVtYSIsInR5cGVEZWZzIiwicmVzb2x2ZXJzIiwicG9zdHMiLCJnZXRQb3N0IiwiYXV0aG9ycyIsImdldEF1dGhvciIsImNyZWF0ZVBvc3QiLCJjcmVhdGVBdXRob3IiLCJzY2hlbWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztlQUNnQkEsT0FBTyxDQUFDLGVBQUQsQztJQUFmQyxHLFlBQUFBLEc7O2dCQUN5QkQsT0FBTyxDQUFDLGVBQUQsQztJQUFoQ0Usb0IsYUFBQUEsb0IsRUFFUjs7O0FBQ0EsSUFBTUMsUUFBUSxHQUFHRixHQUFILG1CQUFkO0FBMkNBLElBQU1HLFNBQVMsR0FBRyxtQkFDaEJDLGlCQURnQixFQUVoQkMsbUJBRmdCLEVBR2hCQyxtQkFIZ0IsRUFJaEJDLHFCQUpnQixFQUtoQkMsc0JBTGdCLEVBTWhCQyx3QkFOZ0IsQ0FBbEI7QUFTQSxJQUFNQyxNQUFNLEdBQUdULG9CQUFvQixDQUFDO0FBQ2xDQyxFQUFBQSxRQUFRLEVBQVJBLFFBRGtDO0FBRWxDQyxFQUFBQSxTQUFTLEVBQVRBO0FBRmtDLENBQUQsQ0FBbkM7ZUFLZU8sTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1lcmdlIH0gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgY3JlYXRlUG9zdCBmcm9tIFwiLi9tdXRhdGlvbnMvcG9zdC9jcmVhdGVQb3N0XCI7XHJcbmltcG9ydCBjcmVhdGVBdXRob3IgZnJvbSBcIi4vbXV0YXRpb25zL2F1dGhvci9jcmVhdGVBdXRob3JcIjtcclxuaW1wb3J0IHBvc3RzIGZyb20gXCIuL3F1ZXJpZXMvcG9zdC9wb3N0c1wiO1xyXG5pbXBvcnQgZ2V0UG9zdCBmcm9tIFwiLi9xdWVyaWVzL3Bvc3QvZ2V0UG9zdFwiO1xyXG5pbXBvcnQgYXV0aG9ycyBmcm9tIFwiLi9xdWVyaWVzL2F1dGhvci9hdXRob3JzXCI7XHJcbmltcG9ydCBnZXRBdXRob3IgZnJvbSBcIi4vcXVlcmllcy9hdXRob3IvZ2V0QXV0aG9yXCI7XHJcbmNvbnN0IHsgZ3FsIH0gPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlclwiKTtcclxuY29uc3QgeyBtYWtlRXhlY3V0YWJsZVNjaGVtYSB9ID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXJcIik7XHJcblxyXG4vLyBDb25zdHJ1Y3QgYSBzY2hlbWEsIHVzaW5nIEdyYXBoUUwgc2NoZW1hIGxhbmd1YWdlXHJcbmNvbnN0IHR5cGVEZWZzID0gZ3FsYFxyXG4gIHNjYWxhciBEQVRFXHJcblxyXG4gIGlucHV0IGF1dGhvcklucHV0IHtcclxuICAgIGVtYWlsOiBTdHJpbmdcclxuICAgIG5hbWU6IFN0cmluZ1xyXG4gIH1cclxuXHJcbiAgaW5wdXQgcG9zdElucHV0IHtcclxuICAgIHRpdGxlOiBTdHJpbmdcclxuICAgIGF1dGhvcjogU3RyaW5nXHJcbiAgICBjb250ZW50OiBTdHJpbmdcclxuICB9XHJcblxyXG4gIHR5cGUgUG9zdCB7XHJcbiAgICBkYXRlOiBEQVRFXHJcbiAgICB0aXRsZTogU3RyaW5nXHJcbiAgICBhdXRob3I6IFN0cmluZ1xyXG4gICAgY29udGVudDogU3RyaW5nXHJcbiAgICBpZDogSUQhXHJcbiAgfVxyXG5cclxuICB0eXBlIEF1dGhvciB7XHJcbiAgICBlbWFpbDogU3RyaW5nIVxyXG4gICAgbmFtZTogU3RyaW5nIVxyXG4gICAgaWQ6IElEIVxyXG4gIH1cclxuXHJcbiAgIyBUaGUgXCJRdWVyeVwiIHR5cGUgaXMgdGhlIHJvb3Qgb2YgYWxsIEdyYXBoUUwgcXVlcmllcy5cclxuICAjIChBIFwiTXV0YXRpb25cIiB0eXBlIHdpbGwgYmUgY292ZXJlZCBsYXRlciBvbi4pXHJcbiAgdHlwZSBRdWVyeSB7XHJcbiAgICBhdXRob3JzOiBbQXV0aG9yXVxyXG4gICAgcG9zdHM6IFtQb3N0XVxyXG4gICAgZ2V0UG9zdChpZDogSUQpOiBQb3N0XHJcbiAgICBnZXRBdXRob3IoaWQ6IElEKTogQXV0aG9yXHJcbiAgfVxyXG5cclxuICB0eXBlIE11dGF0aW9uIHtcclxuICAgIGNyZWF0ZUF1dGhvcihpbnB1dDogYXV0aG9ySW5wdXQpOiBBdXRob3IhXHJcbiAgICBjcmVhdGVQb3N0KGlucHV0OiBwb3N0SW5wdXQpOiBQb3N0IVxyXG4gIH1cclxuYDtcclxuXHJcbmNvbnN0IHJlc29sdmVycyA9IG1lcmdlKFxyXG4gIHBvc3RzLFxyXG4gIGdldFBvc3QsXHJcbiAgYXV0aG9ycyxcclxuICBnZXRBdXRob3IsXHJcbiAgY3JlYXRlUG9zdCxcclxuICBjcmVhdGVBdXRob3JcclxuKTtcclxuXHJcbmNvbnN0IHNjaGVtYSA9IG1ha2VFeGVjdXRhYmxlU2NoZW1hKHtcclxuICB0eXBlRGVmcyxcclxuICByZXNvbHZlcnNcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzY2hlbWE7XHJcbiJdfQ==