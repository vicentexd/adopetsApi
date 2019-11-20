const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')
const UsersController = require('./controllers/UsersControllers')
const AnimalController = require('./controllers/AnimalController')
const LikeController = require('./controllers/LikesController')
const DislikesController = require('./controllers/DislikeController')
const CadasAnimal = require('./controllers/CadasAnimal')

const Post = require('./model/Post')
const Animal = require('./model/Animal')
const User = require('./model/Usuarios')

const routes = express.Router()

// Listagem de Usuarios
routes.get('/user', UsersController.index)

// Listagem de Animais
routes.get('/animais', AnimalController.index)

// Listagem de Animais do responsavel
routes.get('/care', AnimalController.care)

// Listagem de Matchs
routes.get('/matchs', AnimalController.match)

routes.post('/user', UsersController.store)
routes.post('/animal', AnimalController.store)
routes.get('/atual/:id', UsersController.user)
routes.get('/animal/:id', AnimalController.animal)
routes.post('/login', UsersController.login)
routes.post('/users', UsersController.dados)
routes.post('/cadas/:userId', CadasAnimal.store)

// Update Usuario
routes.put('/update/:userId', UsersController.update)

// Likes Dislikes
routes.post('/animais/:idRecebe/likes', LikeController.store)
routes.post('/animais/:idRecebe/dislikes', DislikesController.store)
// UpLoad de imagem
routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key, location: url = '' } = req.file
  const post = await Post.create({
    name,
    size,
    key,
    url,
  })

  return res.json(post)
})

// Deletar um animal
routes.delete('/byeanimal/:id', async (req, res) => {
  const animal = await Animal.findById(req.params.id)
  const user = await User.findById(animal.id_responsavel)
  user.animais.splice(user.animais.indexOf(animal._id), 1)

  await user.save()

  await animal.remove()
  return res.send(true)
})

// Deletar uma imagem
routes.delete('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)

  await post.remove()

  return res.send()
})
module.exports = routes
