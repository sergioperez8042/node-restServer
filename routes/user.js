const { Router } = require("express");
const { check } = require('express-validator');

const {validarCampos,validarJWT,adminRole,tieneRole} = require('../middlewares');
const { getUser, potsUser, putUser, deleteUser, patchUser } = require("../controllers/user");

const { esRolValido, emailExiste, existeUserId } = require('../helpers/db-validators');


const router = Router();


  router.get('/', getUser);
router.put('/:id', [
  check('id', "No es un ID válido").isMongoId(),
  check('id').custom(existeUserId),
  check('role').custom(esRolValido),
  validarCampos
], putUser);
  
router.post('/', [
  //Array de middlewares
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password  debe ser de más de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  check('role').custom(esRolValido),
  // check('role', 'No es un role válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  validarCampos
], potsUser);

router.delete('/:id', [
  validarJWT,
  // adminRole,
  tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
  check('id', "No es un ID válido").isMongoId(),
  check('id').custom(existeUserId),
  validarCampos
], deleteUser);
  router.patch('/', patchUser);
    



module.exports = router;

