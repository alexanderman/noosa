const mongoose = require('mongoose');
const statuses = require('./transaction-statuses');
const Schema = mongoose.Schema;


const transactionSchema = Schema({
  pos_id: String,
  partnerId: String,   /** nike, h&m, etc... */
  transactionType: {
    type: String,
    enum: ['PAY_NOW', 'INSTALLMENT', 'REFUND']
  },
  clientTrxId: String, /** client transaction id, assigned by client */
  date_issued: Date,
  price: Number,

  commission: Number,
  commission_discount: Number,
  total_commission: Number,
  vat: Number,
  total: Number,

  status: {         /** transaction status like, REQUESTED, APPROVED etc... */
    type: Number,
    enum: Object.values(statuses),
    default: 1
  }
});

module.exports = mongoose.model('transaction', transactionSchema);