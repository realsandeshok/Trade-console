// TransactionRoutes.js
const pool = require('../config/database'); // Import your pool configuration

// Function to get all transactions from the database
const getAllTransactions =  async (req, res) =>  {
    try {
        const result = await pool.query('SELECT * FROM transaction');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports={
    getAllTransactions
};