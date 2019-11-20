const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    sexo: {
      type: String,
      required: true,
    },
    nascimento: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    entrevista: {
      type: String,
      required: true,
    },
    imagem: {
      type: String,
      required: true,
    },
    animais: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
      },
    ],
    match: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = model('Users', UserSchema)
