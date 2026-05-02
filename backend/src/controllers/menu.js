const menuController = {
    menu: (req, res) => {
        const context = {}
        res.render('menu/menu', context);
    },
    burguer: (req, res) => {
        const context = {}
        res.render('menu/burguer', context);
    },
    dog: (req, res) => {
        const context = {}
        res.render('menu/dog', context);
    },
    combos: (req, res) => {
        const context = {}
        res.render('menu/combos', context);
    },
    drinks: (req, res) => {
        const context = {}
        res.render('menu/drinks', context);
    }
}

module.exports = menuController;