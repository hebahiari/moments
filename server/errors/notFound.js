/**
 * Express API "Not found" handler.
 */
const path = require("path");

function notFound(req, res, next) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));

  // next({ status: 404, message: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound;
