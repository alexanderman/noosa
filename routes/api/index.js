const processor = require('process-engine');

module.exports = router => {
  
  /** test route for all unfinished transactions */
  router.get('/', async (req, res) => {

    try {
      const results = await processor.fetchInProcessTransactions();
      res.json(results);
    }
    catch (err) {
      res.json({ 
        succeeded: false,
        error: err.message
      });
    }

  });


  router.post('/calculate', (req, res) => {

    res.json(processor.calculate(req.body));
    
  });


  router.post('/process', async (req, res) => {

    try {
      const result = await processor.processTransaction(req.body);
      res.json(result);
    }
    catch (err) {
      res.json({ 
        succeeded: false,
        error: err.message
      });
    }
    
  });

  return router;
};
