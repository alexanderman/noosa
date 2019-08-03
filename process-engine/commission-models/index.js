const models = [
  require('./partners-commissions/h-and-m'),
  require('./partners-commissions/nike'),
  require('./partners-commissions/olive'),
  require('./partners-commissions/small-partner'),
];

/** finds commissions model by partnerId and transaction type */
const findCommissionModel = (partnerId, transactionType) => {
  
  const partner = models.find(model => {
    return model.id == partnerId;
  });

  return partner[transactionType];

}

module.exports = findCommissionModel;
