const db = require('../models')


const cartController = {
  carrinho: (req, res) => {
    res.render('cart', { session: req.session });
  },
  comprar: async (req, res) => {
    if (req.session.loggedUser == true) {
      const carrinho = req.body.carrinho;
      const userEmail = req.session.email;

      let totalCompra = 0;
      carrinho?.forEach(item => {
        totalCompra += (item.valor * item.quantidade)
      })

      const orderEntry = {
        cliente: userEmail,
        total: totalCompra
      }
      db.Order.create(orderEntry).then(order => {
        carrinho?.forEach(item => {
          const orderItemsEntry = {
            orderId: order.id,
            productId: item.id,
            quantity: item.quantidade
          }

          db.OrderItems.create(orderItemsEntry)
        })

        res.send(JSON.stringify({ "orderId": order.id }));
      }).catch((error) => {
        res.send(JSON.stringify({ "error": "An error has ocurred when trying to finish order: " + error }));
      })
    } else {
      res.send(JSON.stringify({ "error": "Usuário não logado no sistema. Faça o login e tente novamente." }));
    }
  }
}

module.exports = cartController;