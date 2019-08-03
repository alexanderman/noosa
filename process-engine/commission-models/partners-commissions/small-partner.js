const partnerTypes = require('../partner-types');
const transactionTypes = require('../transaction-types');
const commissionModel = require('../commission-model');

const model = {
  type: partnerTypes.SMALL_PARTNER,
  name: 'Small Partner',
  id: 1,
  
  [transactionTypes.PAY_NOW]: {
    ...commissionModel,
    commission: 0.07,
    price_treshold: 1000,
    commission_above: 0.05,
  },

  [transactionTypes.INSTALLMENT]: {
    ...commissionModel,
    commission: 0.08,
    price_treshold: 1000,
    vat_above: 0.07,
  },

  [transactionTypes.REFUND]: {
    ...commissionModel,
    commission: 0,
  },
}

module.exports = model;

