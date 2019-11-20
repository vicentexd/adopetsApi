const Users = require('../model/Usuarios')
const Animal = require('../model/Animal')

module.exports = {
  async update(req, res) {
    const usuario = Users.findByIdAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true },
      (error, user) => {
        if (error) {
          res.send(error)
        }
        res.send(user)
      }
    )
  },

  async index(req, res) {
    const { idanimal } = req.headers

    const animal = await Animal.findById(idanimal)

    const users = await Users.find({
      $or: [
        { _id: { $in: animal.interessados } },
        { _id: { $in: animal.likes } },
      ],
    })

    return res.json(users)
  },

  async user(req, res) {
    const { id } = req.params
    const usuario = await Users.findById(id)
    return res.json(usuario)
  },

  async login(req, res) {
    const { emailuser, senhauser } = req.body
    const loginconfirm = await Users.findOne({
      email: emailuser,
      senha: senhauser,
    })

    const loginemail = await Users.findOne({ email: emailuser })

    if (loginconfirm) {
      return res.json(loginconfirm)
    }
    if (loginemail) {
      return res.send('2')
    }
    return res.send('3')
  },
  async dados(req, res) {
    const { id } = req.body

    const retorno = await Users.findById({ id })

    return res.json(retorno)
  },
  async store(req, res) {
    const {
      nome,
      senha,
      sexo,
      nascimento,
      email,
      telefone,
      entrevista,
      imagem,
    } = req.body

    const usuarioExiste = await Users.findOne({ email })

    if (usuarioExiste) {
      return res.send('existe')
    }

    const Usuario = await Users.create({
      nome,
      senha,
      sexo,
      nascimento,
      email,
      telefone,
      entrevista,
      imagem,
    })

    return res.send('cadastrado')
  },
}
