const transactionModel = require('./commission-models/transaction-model');
const findCommissionModel = require('./commission-models');


const getCommission = (transaction, commissionModel) => {
  let commission = transaction.price * commissionModel.commission;
  
  if (commissionModel.commission_above > -1 && commissionModel.price_treshold <= transaction.price) {
    commission = transaction.price * commissionModel.commission_above;
  }

  if (commissionModel.max_commission > -1 && commission >= commissionModel.max_commission) {
    commission = commissionModel.max_commission;
  }

  return commission;
};

const getCommissionDiscount = (transaction, commissionModel, weekendDays) => {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  // const weekendDays = [5, 6];

  if (weekendDays.indexOf(dayOfWeek) > -1) {
    return transaction.commission * commissionModel.commission_weekend_discount;
  }
  return 0;
}

const getVat = (transaction, commissionModel) => {
  let vat = 0;

  if (commissionModel.vat > -1) {
    vat = transaction.price * commissionModel.vat;
  }

  if (commissionModel.vat_above > -1 && transaction.price >= commissionModel.price_treshold) {
    vat = transaction.price * commissionModel.vat_above;
  }

  return vat;
}


const calculate = weekendDays => transactionRequest => {
  
  /** find partner commission details by transaction type and partner id */
  const commissionModel = findCommissionModel(transactionRequest.partnerId, transactionRequest.transactionType);
  if (!commissionModel)
    throw new Error(`commission model not found for ${transactionRequest.partnerId}-${transactionRequest.transactionType}`);

  const transactionResponse = { ...transactionModel, ...transactionRequest };
  transactionResponse.commission = getCommission(transactionResponse, commissionModel);
  transactionResponse.commission_discount = - getCommissionDiscount(transactionResponse, commissionModel, weekendDays);
  transactionResponse.vat = getVat(transactionResponse, commissionModel);
  transactionResponse.total_commission = transactionResponse.commission + transactionResponse.commission_discount;
  transactionResponse.total = transactionResponse.price + transactionResponse.total_commission + transactionResponse.vat;

  return transactionResponse;
}

module.exports = calculate;
