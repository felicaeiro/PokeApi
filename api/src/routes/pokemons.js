// const router = require('./index');
const { Router } = require('express'),
  { getAllPokemon } = require('../controllers/getAllPokemon'),
  { postPokemon } = require('../controllers/postPokemon'),
  { getPokemonById } = require('../controllers/getPokemonById');

const router = Router();

router.get('', getAllPokemon);
router.get('/:idPokemon', getAllPokemon);
router.post('', postPokemon);

module.exports = router;
