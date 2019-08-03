const calculate = require('./calculator'); 
const database = require('./database');
const statuses = require('./database/transaction-statuses');

const emulateBankApproval = transaction => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(transaction);
      // reject(new Error('insufficient funds'));
    }, 1000);
  });
}

/** I expect to receive here calculated valid transaction, (with total) */
const processTransaction = transaction => {
  let doc;

  return database.saveTransaction(transaction)
  .then(res => {
    doc = res;
    doc.status = statuses.IN_PROCESS;
    return Promise.all([emulateBankApproval(doc), database.updateTransaction(doc)]);
  })
  .then(() => {
    doc.status = statuses.APPROVED;
    database.updateTransaction(doc);
    return doc.toObject();
  })
  .catch(err => {
    doc.status = statuses.REJECTED;
    database.updateTransaction(doc);
    return Promise.reject(err);
  });
  
};

const fetchInProcessTransactions = () => database.fetchInProcessTransactions();


module.exports = {
  calculate,
  processTransaction,
  fetchInProcessTransactions
};

