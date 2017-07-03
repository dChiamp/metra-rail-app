var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override')


var railController = require('../controllers/railController');

router.route('/api/rail/:route')
  .get(railController.getDepartureInfo)



module.exports = router;