const stockController = {
    admstock: (req, res) => {
        const context = {}
        res.send('admstock', context);
    }
}

module.exports = stockController;