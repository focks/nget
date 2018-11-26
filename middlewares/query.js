var ERRORS = require('../errors');
var _ = require('lodash');

var VALID_QUERY_PARAMS = ['category', 'country', 'keyword'];

var VALID_COUNTRY_CODES = ['in', 'us', 'pk', 'uk', 'fr', 'ru'] // add more

module.exports = (req, res, next) => {
  var valid = false;

  VALID_QUERY_PARAMS.forEach((qparam) => {
    if(_.has(req.query, qparam)) {
      valid = true;
    }
  })
  // query params not present
  if(!valid){
    res.status(ERRORS.INVALID_QUERY_PARAMS);
    res.json({
      status: "error",
      message: ERRORS.INVALID_QUERY_PARAMS_MESSAGE,
      code: ERRORS.INVALID_QUERY_PARAMS_ERR_CODE
    });
    return;
  }

  // check invalid country code
  if(_.get(req.query, 'country', null) !== null){
    let validCountry = false;
    VALID_COUNTRY_CODES.forEach((country_code) => {
      if(country_code.toLowerCase() === country_code) { // valid
        validCountry = true;
      }
    });

    if(!validCountry){
      res.status(ERRORS.INVALID_COUNTRY_CODE);
      res.json({
        status: "error",
        message: ERRORS.INVALID_COUNTRY_MESSAGE,
        code: ERRORS.INVALID_COUNTRY_ERR_CODE
      })

      return;
    }
  }

  // TODO check for valid category

  next();


}
