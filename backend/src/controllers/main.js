const db = require('../models')
const { Op } = require("sequelize");

const generalController = {
    home: async (req, res) => {
        const burguer = await db.Product.findAll({
            where: {
                categoryId: {
                    [Op.eq]: 1
                }
            }
        })

        const dog = await db.Product.findAll({
            where: {
                categoryId: {
                    [Op.eq]: 2
                }
            }
        })

        const drink = await db.Product.findAll({
            where: {
                categoryId: {
                    [Op.eq]: 3
                }
            }
        })

        const produtos = {
            burguer,
            dog,
            drink
        }

        res.render('index', { produtos });
    }
}

module.exports = generalController;