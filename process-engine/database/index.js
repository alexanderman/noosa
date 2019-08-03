const mongoose = require('mongoose');
const TransactionModel = require('./transaction-model');

mongoose.connect('mongodb://127.0.0.1:27099/noosa', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', err => {
  console.error('db error:', err);
});

db.once('open', function() {
  console.log('db connected');
});


const saveTransaction = transaction => {
  return new Promise((resolve, reject) => {
    const doc = new TransactionModel(transaction);
    doc.save((err, doc) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(doc);
    })
  });
}

const updateTransaction = transactionDoc => {
  return new Promise((resolve, reject) => {
    transactionDoc.save((err, doc) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(doc);
    })
  });
}

/** this method should be used to fetch transactions that not yet finished processing, to finish them */
const fetchInProcessTransactions = () => {
  return TransactionModel.find().or([ { status: 1 }, { status: 2 } ])
  .then(resArr => resArr.map(i => i.toObject()));
}

module.exports = {
  saveTransaction,
  updateTransaction,
  fetchInProcessTransactions
}
