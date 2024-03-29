# NOOSA POS API

### Prerequisites
 - node 10.15.1   

I used docker for mongodb image
 - docker pull mongo:4.0.11
 - docker run -d -p 27099:27017 --name mongo mongo:4.0.11

### Installation
 - git clone https://github.com/alexanderman/noosa.git
 - cd noosa
 - npm install 
 - cd process-engine && npm install 

### Run project
to run the API and play with it in Postman (you can copy request body from api documentation)
 - cd noosa
 - npm start
to run the test
 - cd noosa/process-engine
 - npm test
 
## API Documentation
 - **GET http://localhost:5000/api** will return a list of started but NOT finished transactions
 - **POST http://localhost:5000/api/calculate** will calculate the commission + vat + total amount to pay  
 request example
```json
 {
	"pos_id": "1234da13",
	"partnerId": 4,  
	"transactionType": "INSTALLMENT",
	"clientTrxId": "some-id-1234",
	"price": 1000
}
```
 response example
```json
{
    "pos_id": "1234da13",
    "partnerId": 4,
    "transactionType": "INSTALLMENT",
    "clientTrxId": "some-id-1234",
    "price": 1000,
    "commission": 40,
    "commission_discount": -0.2,
    "total_commission": 39.8,
    "vat": 70,
    "total": 1109.8
}
```
 - **http://localhost:5000/api/process** will process calculated transaction, I assume here, I receive all the needed values, calculated at prevoius api call, the response is the same transaction if succeeded or error message if failed.

### TODOS
 - validate all json data received from the api
 - keep process-engine commission models in some DB
 - validate the integrity of process-engine commission models 
 - create process that processing unfinished transactions


