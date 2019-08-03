const partnerTypes = require('../partner-types');
const transactionTypes = require('../transaction-types');
const commissionModel = require('../commission-model');

const model = {
  type: partnerTypes.BIG_PARTNER,
  name: 'Nike',
  id: 3,
  
  [transactionTypes.PAY_NOW]: {
    ...commissionModel,
    commission: 0.03,
    max_commission: 100,
  },

  [transactionTypes.INSTALLMENT]: {
    ...commissionModel,
    commission: 0.04,
    max_commission: 100,
  },

  [transactionTypes.REFUND]: {
    ...commissionModel,
    commission: 0,
  },
}

module.exports = model;

