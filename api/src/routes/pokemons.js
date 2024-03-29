// const router = require('./index');
const { Router } = require('express');
const { getAllPokemon } = require('../controllers/getAllPokemon');
const { postPokemon } = require('../controllers/postPokemon');
const { getPokemonById } = require('../controllers/getPokemonById');
const { deletePokemon } = require('../controllers/deletePokemon');
const { updatePokemon } = require('../controllers/updatePokemon');

const router = Router();

router.get('', getAllPokemon);
router.get('/:idPokemon', getPokemonById);
router.post('', postPokemon);
router.delete('/:idPokemon', deletePokemon);
router.put('', updatePokemon);

module.exports = router;
