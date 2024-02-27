const express = require('express');
const {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario,
} = require('../controllers/usuario.js');

const router = express.Router();

router.get('/usuarios', getUsuarios);
router.post('usuario/enviar-dados', addUsuario);
router.put('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', deleteUsuario);

module.exports = router;
