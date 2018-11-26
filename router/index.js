var express = require('express');

var queryMiddleware = require('../middlewares/query');
var controllers = require('../controllers/index')


var router = express.Router();

router.use(queryMiddleware);

/* GET home page. */
router.get('/', controllers.queryCtrl);

module.exports = router;
