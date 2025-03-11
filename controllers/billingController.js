import billingModel from '../models/billingModel.js';

const convertISODateToMySQL = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

const billingController = {
 async createBilling(req, res) {
        try {
          const billingData = req.body;
    
          // Convert ISO date to MySQL datetime format
          if (billingData.date) {
            billingData.date = convertISODateToMySQL(billingData.date);
          }
    
          const billingId = await billingModel.createBilling(billingData);
          res.status(201).json({ id: billingId, ...billingData });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
  async getAllBillings(req, res) {
    try {
      const billings = await billingModel.getAllBillings();
      res.status(200).json(billings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getBillingById(req, res) {
    try {
      const billing = await billingModel.getBillingById(req.params.id);
      if (billing) {
        res.status(200).json(billing);
      } else {
        res.status(404).json({ message: 'Billing not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default billingController;