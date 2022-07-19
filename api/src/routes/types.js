const { Router } = require('express'),
  { getTypes } = require('../controllers/getTypes'),
  router = Router();

router.get('', getTypes);
module.exports = router;
