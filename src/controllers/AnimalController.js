const Animal = require('../model/Animal')
const User = require('../model/Usuarios')

module.exports = {
  async index(req, res) {
    const { user } = req.headers

    const usuario = await User.findById(user)

    const animais = await Animal.find({
      $and: [
        { _id: { $nin: usuario.animais } },
        { _id: { $nin: usuario.likes } },
        { _id: { $nin: usuario.dislikes } },
      ],
    })

    return res.json(animais)
  },

  async care(req, res) {
    const { user } = req.headers

    const animais = await Animal.find({
      id_responsavel: user,
    })

    return res.json(animais)
  },

  async match(req, res) {
    const { user } = req.headers

    const usuario = await User.findById(user)

    const matchs = await Animal.find({
      _id: {$in : usuario.match}
    })

    return res.json(matchs)
  },

  async animal(req, res) {
    const { id } = req.params
    const animal = await Animal.findById(id)
    return res.json(animal)
  },

  async store(req, res) {
    const {
      nome,
      sexo,
      idade,
      tipo,
      porte,
      responsavel,
      id_responsavel,
      imagem,
      descricao,
    } = req.body

    const pet = await Animal.create({
      nome,
      sexo,
      idade,
      tipo,
      porte,
      responsavel,
      id_responsavel,
      imagem,
      descricao,
    })

    return res.json(pet)
  },
}
