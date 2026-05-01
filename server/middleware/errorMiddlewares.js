// error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  console.error(
    process.env.NODE_ENV === "development" ? err.stack : err.message,
  );
  res.json({
    success: false,
    message: err.message || "Something Went Wrong",
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorHandler;
