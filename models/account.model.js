const mongoose = require('mongoose')

const Schema = mongoose.Schema

const accountSchema = new Schema({
  branch: { type: Number, required: true },
  account: { type: Number, required: true },
  name: { type: String, required: true },
  balance: {
    type: Number,
    required: true,
    min: 0,
    validade(balance) {
      if (balance < 0) throw new Error('negative balance not allowed!')
    },
  },
})

const Account = mongoose.model('Account', accountSchema)
module.exports = Account
