const mongoose = require('mongoose')


// particular Item in a cart
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,
  image: String,
  price: Number,
  size: String,
  color: String,
  quantity: {
    type: Number,
    default: 1
  },
}, { _id: false }) 


// all the prod in cart
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false  
  },
  guestId: {
    type: String
  },
  products: [cartItemSchema],  
  totalPrice: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)
