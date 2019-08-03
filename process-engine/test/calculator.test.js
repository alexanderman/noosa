const assert = require('assert');
const calculator = require('../calculator');

const partnerIds = {
  nike: 3,
  olive: 4,
  small: 1
}

const installmentRequest = {
	"pos_id": "1234da13",
	"clientTrxId": "some-id-1234",
	"price": 1000
};


describe('Calculate prices at the middle of week', function () {
  
  const calculate = calculator([]);

  it('should return transaction with total of 1110, commission of 40, for INSTALLMENT type for Olive', function () {
      const result = calculate({ 
        ...installmentRequest, 
        transactionType: "INSTALLMENT", 
        partnerId: partnerIds.olive 
      });

      assert.equal(result.total, 1110);
      assert.equal(result.total_commission, 40);
      assert.equal(result.vat, 70);
  });

  it('should return transaction with total of 1040, commission of 40, for PAY_NOW type for Olive', function () {
      const result = calculate({ 
        ...installmentRequest, 
        transactionType: "PAY_NOW", 
        partnerId: partnerIds.olive 
      });

      assert.equal(result.total, 1040);
      assert.equal(result.total_commission, 40);
      assert.equal(result.vat, 0);
  });

  it('should return transaction with total of 1000, commission of 0, for REFUND type for Olive', function () {
      const result = calculate({ 
        ...installmentRequest, 
        transactionType: "REFUND", 
        partnerId: partnerIds.olive 
      });

      assert.equal(result.total, 1000);
      assert.equal(result.total_commission, 0);
      assert.equal(result.vat, 0);
  });
});



describe('Calculate prices at weekend, with discount', function () {
  
  const calculate = calculator([0,1,2,3,4,5,6]);

  it('should return transaction with total of 1109.8, commission of 39.8, for INSTALLMENT type for Olive', function () {
      const result = calculate({ 
        ...installmentRequest, 
        transactionType: "INSTALLMENT", 
        partnerId: partnerIds.olive 
      });

      assert.equal(result.total, 1109.8);
      assert.equal(result.total_commission, 39.8);
  });

});
