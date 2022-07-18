// const router = require('./index');
const { Router } = require('express');
const { getAllPokemon } = require('../controllers/getAllPokemon');

const router = Router();

router.get('', getAllPokemon);

module.exports = router;
