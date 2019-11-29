const { Schema, model } = require('mongoose')

const AnimalSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    sexo: {
      type: String,
      required: true,
    },
    idade: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    porte: {
      type: String,
      required: true,
    },
    responsavel: {
      type: String,
      required: true,
    },
    id_responsavel: {
      type: String,
      required: true,
    },
    imagem: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    interessados: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = model('Animal', AnimalSchema)
