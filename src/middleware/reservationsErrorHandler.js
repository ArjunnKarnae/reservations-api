const { constants } = require("../utils/constants");

const reservationsErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode) {
        case constants.VALIDATION_FAILED:
            res.json({
                "title": "Validation Failed",
                "statusCode": res.statusCode,
                "message": err.message
            });
            break;
        case constants.UNAUTHORIZED_ERROR:
            res.json({
                "title": "Authorization Failed",
                "statusCode": res.statusCode,
                "message": err.message
            });
            break;
        case constants.FORBIDDEN_ERROR:
            res.json({
                "title": "Authorization Failed",
                "statusCode": res.statusCode,
                "message": err.message
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                "title": "Url Not Found",
                "statusCode": res.statusCode,
                "message": err.message
            });
            break;
        default:
            res.json({
                "title": "Internal Server Error",
                "statusCode": res.statusCode,
                "message": err.message
            });
            break;
    }
    
};

module.exports = reservationsErrorHandler;



