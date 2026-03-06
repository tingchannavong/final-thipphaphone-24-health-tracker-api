export default function errorHandler(err, re, res, next) {
    console.log(err);
    res.json({
        status: err.status,
        message: err.message
    });
}