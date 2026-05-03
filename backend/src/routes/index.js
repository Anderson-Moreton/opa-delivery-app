const express = require('express');
const router = express.Router();
const generalController = require('../controllers/main');
const contactController = require('../controllers/contact');
const aboutUsController = require('../controllers/aboutUs');
const { userController, loggedUser } = require('../controllers/user');
const cartController = require('../controllers/cart');
/*autehentication*/
const { body } = require('express-validator')
const validations = [
    body('name').notEmpty().isLength({ min: 4 }).withMessage("Nome nao pode ser vazio!"),
    body('email').notEmpty().withMessage("Email nao pode ser vazio!"),
    body('birthday').notEmpty().withMessage(" nao pode ser vazio!"),
    body('cellphone').notEmpty().withMessage("Contato nao pode ser vazio!"),
    body('password').notEmpty().withMessage("Senha nao pode ser vazio!"),
    body('cep').notEmpty().withMessage("Cep nao pode ser vazio!"),
    body('addressNumber').notEmpty().withMessage("Nome nao pode ser vazio!"),
    body('addressComplement').notEmpty().withMessage("Nome nao pode ser vazio!"),
    body('address').notEmpty().withMessage("Nome nao pode ser vazio!"),
    body('city').notEmpty().withMessage(" nao pode ser vazio!"),
    body('state').notEmpty().withMessage("Nome nao pode ser vazio!"),
    body('avenue').notEmpty().withMessage("Nome nao pode ser vazio!")
]
const validationsContact = [
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('cellphone').notEmpty(),
    body('address').notEmpty()
]




/*Home*/
router.get('/', generalController.home);

/*Contact*/
router.get('/contato', contactController.contato);

router.post('/contato/sent', validationsContact, contactController.sent);

/*About Us*/
router.get('/quemsomos', aboutUsController.quemsomos);

/*Authentication*/
router.get('/entrar', userController.loginPage);
router.get('/registrar', userController.registerPage);
router.post('/user/login', userController.login);
router.post('/user/register', validations, userController.register);
router.get('/user/logout', userController.logout);

/*Cart*/
router.get('/carrinho', cartController.carrinho);
router.post('/carrinho/comprar', cartController.comprar);

module.exports = router;