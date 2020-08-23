
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
}

module.exports = { errorHandler }