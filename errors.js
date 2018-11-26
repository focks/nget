module.exports.NOT_FOUND_CODE = 404;
module.exports.NOT_FOUND_MESSAGE = "Resource not found";

module.exports.UNAUTHORIZED_CODE = 403; // Forbidden
module.exports.UNAUTHORIZED_MESSAGE = "Unauthorized";

// in case of invalid token (if token based)
module.exports.UNATHENTICATED_CODE = 401;
module.exports.UNAUTHENTICATED_MESSAGE = "Invalid token";

// bad requests
module.exports.INVALID_QUERY_PARAMS = 400;
module.exports.INVALID_QUERY_PARAMS_ERR_CODE = "400.01";
module.exports.INVALID_QUERY_PARAMS_MESSAGE = "Query params cannot be empty. Valid queries include country, keyword, category";


module.exports.SERVER_ERROR = 500;
module.exports.SERVER_ERROR_MESSAGE = "Something went wrong in the server.";


// more message follows ;) like invalid_country_code, invalid category etc
module.exports.INVALID_COUNTRY_CODE = 400;
module.exports.INVALID_COUNTRY_ERR_CODE = "400.02";
module.exports.INVALID_COUNTRY_MESSAGE = "invalid country code, valid country codes include ['in', 'us', 'pk', 'uk', 'fr', 'ru']";
