const User = require('../model/Usuarios')

module.exports = {
  async store(req, res) {
    const { userId } = req.params
    const { animal } = req.headers

    const user = await User.findById(userId)
    console.log(userId)
    console.log(animal)

    user.animais.push(animal)

    await user.save()

    return res.send(true)
  },
}
