var ERRORS = require('../errors')
var _ = require('lodash')

var VALID_QUERY_PARAMS = ['category', 'country', 'keyword']

module.exports = (req, res, next) => {
  var valid = false;

  VALID_QUERY_PARAMS.forEach((qparam) => {
    if(_.has(req, qparam)) {
      valid = true;
    }
  })
  if(valid){
    next();
  } else {
    res.status(ERRORS.INVALID_QUERY_PARAMS);
    res.json({
      message: ERRORS.INVALID_QUERY_PARAMS_MESSAGE
    });
  }

}
