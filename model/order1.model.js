const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Schema = mongoose.Schema;
var ItemSchema = new Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price can not be less then 0.']
  }
});
const OrderScema = new Schema({
  user: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: [
        /[\w]+?@[\w]+?\.[a-z]{2,4}/,
        'The value of path {PATH} ({VALUE}) is not a valid email address.'
      ]
    }
  },
  billingAddress: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: [
        /[\w]+?@[\w]+?\.[a-z]{2,4}/,
        'The value of path {PATH} ({VALUE}) is not a valid email address.'
      ]
    },
    postCode: {
      type: String,
      required: true,
      match: [
        /[\d]{4,5}/,
        'The value of path {PATH} ({VALUE}) is not a valid post code.'
      ]
    },
    district: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'Bangladesh'
    }
  },
  shippingMethod: {
    type: String,
    default: 'free'
  },
  paymentMethod: {
    type: String,
    default: '"cash_on_delivery"'
  },
  grandTotal: {
    type: Number,
    required: true,
    min: [0, 'Price can not be less then 0.']
  },
  items: [ItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});