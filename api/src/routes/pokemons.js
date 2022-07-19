// const router = require('./index');
const { Router } = require('express');
const { getAllPokemon } = require('../controllers/getAllPokemon');
const { postPokemon } = require('../controllers/postPokemon');
const { getPokemonById } = require('../controllers/getPokemonById');

const router = Router();

router.get('', getAllPokemon);
router.get('/:idPokemon', getPokemonById);
router.post('', postPokemon);

module.exports = router;
