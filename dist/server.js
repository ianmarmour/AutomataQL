"use strict";

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require("apollo-server"),
    ApolloServer = _require.ApolloServer,
    gql = _require.gql;

// DynamoDB Setup and Configuration
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2"
});
var ddb = new AWS.DynamoDB({
  apiVersion: "2012-08-10"
});
var server = new ApolloServer({
  schema: _schema["default"],
  context: function context(_ref) {
    var req = _ref.req;
    return {
      // We pass the database connector into our resolvers via the context
      database: ddb
    };
  }
});
server.listen().then(function (_ref2) {
  var url = _ref2.url;
  console.log("Server ready at ".concat(url));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkFwb2xsb1NlcnZlciIsImdxbCIsIkFXUyIsImNvbmZpZyIsInVwZGF0ZSIsInJlZ2lvbiIsImRkYiIsIkR5bmFtb0RCIiwiYXBpVmVyc2lvbiIsInNlcnZlciIsInNjaGVtYSIsImNvbnRleHQiLCJyZXEiLCJkYXRhYmFzZSIsImxpc3RlbiIsInRoZW4iLCJ1cmwiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7O2VBRDhCQSxPQUFPLENBQUMsZUFBRCxDO0lBQTdCQyxZLFlBQUFBLFk7SUFBY0MsRyxZQUFBQSxHOztBQUd0QjtBQUNBLElBQUlDLEdBQUcsR0FBR0gsT0FBTyxDQUFDLFNBQUQsQ0FBakI7O0FBQ0FHLEdBQUcsQ0FBQ0MsTUFBSixDQUFXQyxNQUFYLENBQWtCO0FBQUVDLEVBQUFBLE1BQU0sRUFBRTtBQUFWLENBQWxCO0FBQ0EsSUFBSUMsR0FBRyxHQUFHLElBQUlKLEdBQUcsQ0FBQ0ssUUFBUixDQUFpQjtBQUFFQyxFQUFBQSxVQUFVLEVBQUU7QUFBZCxDQUFqQixDQUFWO0FBRUEsSUFBTUMsTUFBTSxHQUFHLElBQUlULFlBQUosQ0FBaUI7QUFDOUJVLEVBQUFBLE1BQU0sRUFBTkEsa0JBRDhCO0FBRTlCQyxFQUFBQSxPQUFPLEVBQUU7QUFBQSxRQUFHQyxHQUFILFFBQUdBLEdBQUg7QUFBQSxXQUFjO0FBQ3JCO0FBQ0FDLE1BQUFBLFFBQVEsRUFBRVA7QUFGVyxLQUFkO0FBQUE7QUFGcUIsQ0FBakIsQ0FBZjtBQVFBRyxNQUFNLENBQUNLLE1BQVAsR0FBZ0JDLElBQWhCLENBQXFCLGlCQUFhO0FBQUEsTUFBVkMsR0FBVSxTQUFWQSxHQUFVO0FBQ2hDQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsMkJBQStCRixHQUEvQjtBQUNELENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IEFwb2xsb1NlcnZlciwgZ3FsIH0gPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlclwiKTtcclxuaW1wb3J0IHNjaGVtYSBmcm9tIFwiLi9zY2hlbWFcIjtcclxuXHJcbi8vIER5bmFtb0RCIFNldHVwIGFuZCBDb25maWd1cmF0aW9uXHJcbnZhciBBV1MgPSByZXF1aXJlKFwiYXdzLXNka1wiKTtcclxuQVdTLmNvbmZpZy51cGRhdGUoeyByZWdpb246IFwidXMtd2VzdC0yXCIgfSk7XHJcbnZhciBkZGIgPSBuZXcgQVdTLkR5bmFtb0RCKHsgYXBpVmVyc2lvbjogXCIyMDEyLTA4LTEwXCIgfSk7XHJcblxyXG5jb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcclxuICBzY2hlbWEsXHJcbiAgY29udGV4dDogKHsgcmVxIH0pID0+ICh7XHJcbiAgICAvLyBXZSBwYXNzIHRoZSBkYXRhYmFzZSBjb25uZWN0b3IgaW50byBvdXIgcmVzb2x2ZXJzIHZpYSB0aGUgY29udGV4dFxyXG4gICAgZGF0YWJhc2U6IGRkYlxyXG4gIH0pXHJcbn0pO1xyXG5cclxuc2VydmVyLmxpc3RlbigpLnRoZW4oKHsgdXJsIH0pID0+IHtcclxuICBjb25zb2xlLmxvZyhgU2VydmVyIHJlYWR5IGF0ICR7dXJsfWApO1xyXG59KTtcclxuIl19