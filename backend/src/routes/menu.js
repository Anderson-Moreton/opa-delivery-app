const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu');


router.get('/', menuController.menu);
router.get('/burguers', menuController.burguer);
router.get('/dogs', menuController.dog);
router.get('/combos', menuController.combos);
router.get('/drinks', menuController.drinks);

module.exports = router;
