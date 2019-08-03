const partnerTypes = require('../partner-types');
const transactionTypes = require('../transaction-types');
const commissionModel = require('../commission-model');

const model = {
  type: partnerTypes.BIG_PARTNER,
  name: 'Olive',
  id: 4,
  
  [transactionTypes.PAY_NOW]: {
    ...commissionModel,
    commission: 0.05,
    commission_above: 0.04,
    price_treshold: 1000,
  },

  [transactionTypes.INSTALLMENT]: {
    ...commissionModel,
    commission: 0.04,
    price_treshold: 1000,
    vat_above: 0.07,
  },

  [transactionTypes.REFUND]: {
    ...commissionModel,
    commission: 0,
  },
}

module.exports = model;

