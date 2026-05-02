const { validationResult } = require('express-validator')
const db = require('../models')
const admController = {
    loginPage: (req, res) => {
        const context = {}
        res.render('administrator', context);
    },
    registerPage: (req, res) => {
        const context = {}
        res.render('register', context);
    },
    login: (req, res) => {
        const { email, password } = req.body;
        req.session.loggedUser = true;
        req.session.email = email;
        req.session.password = password;

        res.redirect('/');
    },
    register: async (req, res, next) => {

        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            console.log(errors.mapped())
            return res.render('register', { errors: errors.mapped(), old: req.body })
        } else {
            const { email, password, state } = req.body;
            req.session.loggedUser = true;
            req.session.email = email;
            req.session.password = password;

            const registrationform = await db.registrationForm.create({
                email,
                password,
                state
            });

            return registrationform, res.redirect('/');

        }
    },
    logout: (req, res) => {
        req.session.loggedUser = false;
        req.session.email = null;
        req.session.password = null;

        res.redirect('/');
    }
}

function loggedUser(req, res, next) {
    if (!req.session.loggedUser) {
        res.redirect('/entrar');
        console.log("userNotLogged");

    } else {
        console.log("userLogged");
        next()
    }
}

module.exports = { admController, loggedUser };