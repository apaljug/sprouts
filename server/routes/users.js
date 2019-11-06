var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* GET users listing. */
router.get('/me', function(req, res, next) {
  const { uid } = req.body
  console.log(uid);
  res.send('user uid is' + uid);
});
module.exports = router;
