var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.send('You\'re so cool !');
});

router.get('/id/:uid', function(req, res, next) {
  res.send('User ID: '+req.params.uid);
});

router.get('/all', function(req, res, next) {
  res.send('pouet !');
});

module.exports = router;
