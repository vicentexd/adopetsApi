const Users = require('../model/Usuarios')
const Animal = require('../model/Animal')

module.exports = {
  async store(req, res) {
    const { idRecebe } = req.params
    const { idenvia, type } = req.headers

    let quemEnvia = null
    let quemRecebe = null

    if (type === 'pessoa') {
      quemEnvia = await Users.findById(idenvia)
      quemRecebe = await Animal.findById(idRecebe)
    }
    if (type === 'animal') {
      quemEnvia = await Animal.findById(idenvia)
      quemRecebe = await Users.findById(idRecebe)
    }

    if (!quemRecebe) {
      return res.status(400).json({ error: 'n localizado' })
    }

    if (type === 'animal') {
      quemEnvia.interessados.splice(
        quemEnvia.interessados.indexOf(quemRecebe._id),
        1
      )
      await quemEnvia.save()
    }

    quemEnvia.dislikes.push(quemRecebe._id)

    await quemEnvia.save()

    return res.json(quemEnvia)
  },
}
