const { Router } = require('express');
const { getEvolutionChain } = require('../controllers/getEvolutionChain');

const router = Router();

router.get('/:id', getEvolutionChain);

module.exports = router;
