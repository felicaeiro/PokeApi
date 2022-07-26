const { Router } = require('express');
const { getTypes } = require('../controllers/getTypes');
const router = Router();

router.get('', getTypes);
module.exports = router;
