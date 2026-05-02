const whoController = {
    quemsomos: (req, res) => {
        const context = {}
        res.render('aboutUs', context);
    }
}

module.exports = whoController;